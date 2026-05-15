import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
          <div className="bg-gray-900 border border-red-800 rounded-xl p-8 max-w-md w-full text-center">
            <div className="text-red-400 text-4xl mb-4">⚠</div>
            <h2 className="text-white text-xl font-semibold mb-2">خطایی رخ داد</h2>
            <p className="text-gray-400 text-sm mb-6">{this.state.message || 'لطفاً صفحه را دوباره بارگذاری کنید.'}</p>
            <button
              onClick={this.handleReset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
