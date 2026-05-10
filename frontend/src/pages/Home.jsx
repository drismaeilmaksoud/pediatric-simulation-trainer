function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welcome to Pediatric Simulation Trainer</h1>
        <p>Interactive clinical cases for pediatric resident training</p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Start Training</button>
          <button className="btn btn-secondary">View Cases</button>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📚 Interactive Cases</h3>
          <p>Evidence-based clinical scenarios with branching decision trees</p>
        </div>
        <div className="feature-card">
          <h3>📊 Progress Tracking</h3>
          <p>Monitor your competency development across pediatric specialties</p>
        </div>
        <div className="feature-card">
          <h3>💡 Instant Feedback</h3>
          <p>Receive immediate feedback with evidence-based explanations</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
