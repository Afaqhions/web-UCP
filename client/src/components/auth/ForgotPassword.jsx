import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(email);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
            <p className="font-bold mb-2">Email sent!</p>
            <p>Check your email for password reset instructions</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@example.com"
            />
            <Button type="submit" isLoading={loading} className="w-full">
              Send Reset Link
            </Button>
          </>
        )}
      </form>
    </Card>
  );
};
