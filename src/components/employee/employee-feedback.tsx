'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, MessageCircle, User, Users, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FeedbackItem } from '@/types/employee';
import { toast } from 'sonner';

interface EmployeeFeedbackProps {
  feedback: FeedbackItem[];
}

const feedbackSchema = z.object({
  message: z.string().min(10, 'Feedback must be at least 10 characters'),
  rating: z.number().min(1).max(5),
  type: z.enum(['peer', 'manager', 'subordinate']),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export function EmployeeFeedback({ feedback }: EmployeeFeedbackProps) {
  const [showForm, setShowForm] = useState(false);
  
  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      message: '',
      rating: 5,
      type: 'peer',
    },
  });

  const onSubmit = (data: FeedbackForm) => {
    // In a real app, this would send the feedback to the server
    toast.success('Feedback submitted successfully!');
    form.reset();
    setShowForm(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manager':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      case 'subordinate':
        return <Users className="h-4 w-4 text-green-600" />;
      case 'peer':
        return <User className="h-4 w-4 text-purple-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'subordinate':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'peer':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Feedback History</h3>
        <Button onClick={() => setShowForm(!showForm)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          {showForm ? 'Cancel' : 'Add Feedback'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {rating} Star{rating > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="peer">Peer Feedback</SelectItem>
                            <SelectItem value="manager">Manager Feedback</SelectItem>
                            <SelectItem value="subordinate">Subordinate Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your feedback here..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Feedback</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {feedback.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No feedback available yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          feedback.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(item.type)}
                    <div>
                      <p className="font-semibold">{item.from}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(item.rating)}
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{item.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}