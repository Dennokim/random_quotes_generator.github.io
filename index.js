const QUOTES_API_URL = "https://type.fit/api/quotes";

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomColor() {
  const colors = [
    "#FF6B6B",
    "#6BFF6B",
    "#6B6BFF",
    "#FF6BFF",
    "#6BFFFF",
    "#FFFF6B",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState("");
  const [backgroundColor, setBackgroundColor] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(QUOTES_API_URL);
      const data = await response.json();

      setQuotes(data);
      let randIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randIndex]);
    }
    fetchData();
  }, []);

  const newQuote = () => {
    if (quotes.length === 0) {
      return;
    }

    const quote = getRandomQuote(quotes);
    setRandomQuote(quote);

    const randomColor = getRandomColor();
    setBackgroundColor(randomColor);

    document.body.style.backgroundColor = randomColor;
  };

  const containerStyle = {
    backgroundColor: "#FFFFFF",
    color: backgroundColor,
    padding: "50px",
    borderRadius: "5px",
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const buttonStyle = {
    fontSize: "18px",
    padding: "10px 20px",
    margin: "10px",
  };

  return (
    <div
      className="container-fluid text-center"
      style={{
        backgroundColor: backgroundColor,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={containerStyle}>
        <div>
          <div
            id="text"
            className="h4"
            style={{ fontSize: "24px", marginBottom: "10px" }}
          >
            {randomQuote.text}
          </div>
          <div id="author" style={{ fontSize: "18px", marginBottom: "20px" }}>
            - {randomQuote.author || "Unknown"}
          </div>
        </div>
        <button
          id="new-quote"
          className="btn btn-primary"
          style={buttonStyle}
          onClick={newQuote}
        >
          New Quote
        </button>
        <div>
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            className="btn btn-info"
            style={buttonStyle}
          >
            <i className="fab fa-twitter" style={{ marginRight: "5px" }}></i>{" "}
            Tweet Quote
          </a>
          <a
            id="tumblr-quote"
            href="https://www.tumblr.com/"
            target="_blank"
            className="btn btn-primary"
            style={buttonStyle}
          >
            <i className="fab fa-tumblr" style={{ marginRight: "5px" }}></i>{" "}
            Tumblr Quote
          </a>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
