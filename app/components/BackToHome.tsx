import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function BackToHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] mb-6"
    >
      <ArrowLeft size={16} />
      Back to Home
    </button>
  );
}
