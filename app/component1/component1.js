import styles from './component1.css';

export default (text = 'Hello world') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  // Attach the generated class name
  element.className = styles.main;
  return element;
};
