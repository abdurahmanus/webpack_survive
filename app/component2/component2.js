import styles from './component2.css';

export default (text = 'Hello world') => {
  const element = document.createElement('p');
  element.innerHTML = text;
  // Attach the generated class name
  element.className = styles.main;
  return element;
};
