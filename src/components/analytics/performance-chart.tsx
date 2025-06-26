'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useHRContext } from '@/contexts/hr-context';

Chart.register(...registerables);

export function PerformanceChart() {
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

    // Calculate rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: state.employees.filter(emp => emp.rating === rating).length
    }));

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ratingDistribution.map(r => `${r.rating} Star${r.rating > 1 ? 's' : ''}`),
        datasets: [{
          data: ratingDistribution.map(r => r.count),
          backgroundColor: [
            '#EF4444',
            '#F97316',
            '#EAB308',
            '#22C55E',
            '#10B981'
          ],
          borderColor: [
            '#DC2626',
            '#EA580C',
            '#CA8A04',
            '#16A34A',
            '#059669'
          ],
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              }
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
  }, [state.employees]);

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Performance Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}