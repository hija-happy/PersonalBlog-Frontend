function Footer() {
    return (
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} My Personal Blog. All rights reserved.</p>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      textAlign: 'center',
      padding: '1rem',
      marginTop: '2rem',
      backgroundColor: '#333',
      color: 'white',
    },
  };
  
  export default Footer;
  