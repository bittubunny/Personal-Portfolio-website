import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#150f20] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg w-full p-8 rounded-3xl bg-[#1d132b] border border-orange-500/30 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto text-orange-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider mb-1">
                ⛩️ Guild Telemetry Safeguard
              </div>
              <h2 className="text-2xl font-extrabold text-white font-heading">
                Something interrupted the spell
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                An unexpected anomaly occurred during render. The ErrorBoundary has caught it to prevent a blank screen.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 rounded-2xl bg-black/50 border border-rose-500/20 text-left font-mono text-xs text-rose-300 max-h-40 overflow-y-auto">
                <div className="font-bold text-rose-400 mb-1">Error:</div>
                <div>{this.state.error.toString()}</div>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-[#150f20] font-extrabold text-xs font-mono transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Guild</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

