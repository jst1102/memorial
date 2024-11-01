import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextareaAutosize from 'react-textarea-autosize';
import toast from 'react-hot-toast';

const schema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters'),
  text: z.string().min(10, 'Message must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

const AddMemory: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Add Firebase submission logic here
      toast.success('Your memory has been shared');
      reset();
    } catch (error) {
      toast.error('Failed to share memory. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Your Name"
          {...register('author')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/5"
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-400">{errors.author.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Your Email"
          {...register('email')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/5"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <TextareaAutosize
          minRows={3}
          placeholder="Share your memory..."
          {...register('text')}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/5 resize-none"
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-400">{errors.text.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Sharing...' : 'Share Memory'}
      </button>
    </form>
  );
};

export default AddMemory;