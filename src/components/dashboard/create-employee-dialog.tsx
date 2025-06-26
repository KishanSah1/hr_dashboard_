'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useHRContext } from '@/contexts/hr-context';
import { Employee } from '@/types/employee';
import { toast } from 'sonner';

const createEmployeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  phone: z.string().min(1, 'Phone number is required'),
  salary: z.number().min(1, 'Salary must be greater than 0'),
  skills: z.string().min(1, 'At least one skill is required'),
});

type CreateEmployeeForm = z.infer<typeof createEmployeeSchema>;

export function CreateEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useHRContext();

  const form = useForm<CreateEmployeeForm>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      phone: '',
      salary: 0,
      skills: '',
    },
  });

  const onSubmit = (data: CreateEmployeeForm) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: 25 + Math.floor(Math.random() * 20), // Random age
      department: data.department,
      position: data.position,
      phone: data.phone,
      address: {
        street: '123 Main St',
        city: 'Sample City',
        state: 'Sample State',
        country: 'Sample Country',
        postalCode: '12345',
      },
      image: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      rating: Math.floor(Math.random() * 5) + 1,
      bio: `Experienced ${data.position.toLowerCase()} with a passion for excellence.`,
      projects: [],
      feedback: [],
      performanceHistory: [],
      joinDate: new Date().toISOString(),
      salary: data.salary,
      skills: data.skills.split(',').map(skill => skill.trim()),
      status: 'active',
    };

    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
    toast.success('Employee created successfully!');
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
          <DialogDescription>
            Add a new employee to the system. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {state.departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="75000" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, TypeScript, Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Employee</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}