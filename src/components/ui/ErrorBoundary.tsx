import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 rounded-lg border border-red-200">
          <h3 className="text-lg font-bold text-red-700 mb-2">Une erreur est survenue</h3>
          <p className="text-sm text-red-600 mb-4">Merci de recharger la page ou de contacter le support. Vous pouvez aussi voir la console pour les détails.</p>
          <pre className="text-xs text-red-600 whitespace-pre-wrap">{String(this.state.error)}</pre>
          <div className="mt-4">
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded">Recharger</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
