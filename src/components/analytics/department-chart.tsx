'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useHRContext } from '@/contexts/hr-context';

Chart.register(...registerables);

export function DepartmentChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { state } = useHRContext();

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Calculate department ratings
    const departmentRatings = state.departments.map(dept => {
      const deptEmployees = state.employees.filter(emp => emp.department === dept.name);
      const avgRating = deptEmployees.length > 0 
        ? deptEmployees.reduce((sum, emp) => sum + emp.rating, 0) / deptEmployees.length 
        : 0;
      return {
        department: dept.name,
        rating: avgRating,
        color: dept.color,
        count: deptEmployees.length
      };
    });

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: departmentRatings.map(d => d.department),
        datasets: [{
          label: 'Average Rating',
          data: departmentRatings.map(d => d.rating),
          backgroundColor: departmentRatings.map(d => d.color + '40'),
          borderColor: departmentRatings.map(d => d.color),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              afterLabel: (context) => {
                const deptData = departmentRatings[context.dataIndex];
                return `Employees: ${deptData.count}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [state.employees, state.departments]);

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}