import { Component, ErrorInfo, PropsWithChildren } from 'react';

import { createLogger } from '../../logging';
import { PageErrorDisplay } from './PageErrorDisplay';

const logger = createLogger('PageErrorBoundary');

type Props = PropsWithChildren<{}>;

interface State {
  lastError: unknown;
}

export class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { lastError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { lastError: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.log('ERRORINFOSTART', errorInfo, 'ERRORINFOEND');
    logger.error(error);
  }

  render() {
    const { children } = this.props;
    const { lastError } = this.state;
    if (lastError) {
      return <PageErrorDisplay error={lastError} />;
    }
    return children;
  }
}
