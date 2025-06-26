'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useBookmarks } from '@/hooks/useBookmarks';

Chart.register(...registerables);

export function BookmarkTrendsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { bookmarkedEmployees } = useBookmarks();

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Generate mock bookmark trend data
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });

    const mockData = [5, 8, 12, 15, 18, bookmarkedEmployees.length];

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: last6Months,
        datasets: [{
          label: 'Bookmarked Employees',
          data: mockData,
          borderColor: '#8B5CF6',
          backgroundColor: '#8B5CF6',
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
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
  }, [bookmarkedEmployees]);

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Bookmark Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}