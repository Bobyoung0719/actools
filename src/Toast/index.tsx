import * as React from 'react';
import './toast.scss';

interface Props {
  content?: string,
  durction?: number,
  onHide: () => void,
  className?: string
}

export default function Toast(props: Props) {
  const {content, durction, onHide, className} = props;
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(!!content);

    const timer = setTimeout(onHide, durction);
    return () => {clearTimeout(timer)}
  }, [content]);

  return (
    <div className={`toast-container ${visible ? 'show' : 'hide'} ${className}`}>
      {content}
    </div>
  );
};

Toast.defaultProps = {
  content: '',
  durction: 1000,
  className: ''
}
