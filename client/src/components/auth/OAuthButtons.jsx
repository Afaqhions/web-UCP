import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const OAuthButtons = ({ onGoogleClick, onGithubClick }) => {
  return (
    <Card>
      <div className="space-y-3">
        <p className="text-center text-gray-600 mb-4">Or continue with</p>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={onGoogleClick}
        >
          <span>🔵</span> Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={onGithubClick}
        >
          <span>⚫</span> Continue with GitHub
        </Button>
      </div>
    </Card>
  );
};
