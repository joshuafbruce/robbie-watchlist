import { useState, useMemo, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

const movies = [
  { title: "The Usual Suspects", year: 1995, rt: 88, audience: 95, genre: "Crime Thriller", vibe: "Twist Ending", rating: "R", runtime: 106, director: "Bryan Singer", stars: "Kevin Spacey, Gabriel Byrne" },
  { title: "Fracture", year: 2007, rt: 72, audience: 82, genre: "Legal Thriller", vibe: "Cat & Mouse", rating: "R", runtime: 113, director: "Gregory Hoblit", stars: "Anthony Hopkins, Ryan Gosling" },
  { title: "Lucky Number Slevin", year: 2006, rt: 52, audience: 87, genre: "Crime Thriller", vibe: "Twist Ending", rating: "R", runtime: 110, director: "Paul McGuigan", stars: "Josh Hartnett, Bruce Willis, Morgan Freeman" },
  { title: "Primal Fear", year: 1996, rt: 78, audience: 88, genre: "Legal Thriller", vibe: "Twist Ending", rating: "R", runtime: 129, director: "Gregory Hoblit", stars: "Richard Gere, Edward Norton" },
  { title: "Pay it Forward", year: 2000, rt: 39, audience: 87, genre: "Drama", vibe: "Feel Good / Heavy", rating: "PG-13", runtime: 123, director: "Mimi Leder", stars: "Kevin Spacey, Haley Joel Osment, Helen Hunt" },
  { title: "Mystic River", year: 2003, rt: 88, audience: 90, genre: "Crime Drama", vibe: "Dark & Heavy", rating: "R", runtime: 138, director: "Clint Eastwood", stars: "Sean Penn, Tim Robbins, Kevin Bacon" },
  { title: "The Life of David Gale", year: 2003, rt: 19, audience: 82, genre: "Legal Thriller", vibe: "Twist Ending", rating: "R", runtime: 130, director: "Alan Parker", stars: "Kevin Spacey, Kate Winslet" },
  { title: "Troy", year: 2004, rt: 54, audience: 76, genre: "Action / Epic", vibe: "Epic Scale", rating: "R", runtime: 163, director: "Wolfgang Petersen", stars: "Brad Pitt, Eric Bana, Orlando Bloom" },
  { title: "Gone Girl", year: 2014, rt: 87, audience: 87, genre: "Psychological Thriller", vibe: "Twist Ending", rating: "R", runtime: 149, director: "David Fincher", stars: "Ben Affleck, Rosamund Pike" },
  { title: "Law Abiding Citizen", year: 2009, rt: 26, audience: 83, genre: "Action Thriller", vibe: "Revenge", rating: "R", runtime: 109, director: "F. Gary Gray", stars: "Gerard Butler, Jamie Foxx" },
  { title: "Seven", year: 1995, rt: 81, audience: 96, genre: "Crime Thriller", vibe: "Dark & Heavy", rating: "R", runtime: 127, director: "David Fincher", stars: "Brad Pitt, Morgan Freeman, Kevin Spacey" },
  { title: "Sleepers", year: 1996, rt: 72, audience: 89, genre: "Crime Drama", vibe: "Revenge", rating: "R", runtime: 147, director: "Barry Levinson", stars: "Kevin Bacon, Robert De Niro, Brad Pitt" },
  { title: "Inside Man", year: 2006, rt: 86, audience: 90, genre: "Crime Thriller", vibe: "Heist / Con", rating: "R", runtime: 129, director: "Spike Lee", stars: "Denzel Washington, Clive Owen, Jodie Foster" },
  { title: "John Q", year: 2002, rt: 18, audience: 85, genre: "Drama", vibe: "Feel Good / Heavy", rating: "PG-13", runtime: 116, director: "Nick Cassavetes", stars: "Denzel Washington, Robert Duvall" },
  { title: "Crash", year: 2004, rt: 75, audience: 84, genre: "Drama", vibe: "Dark & Heavy", rating: "R", runtime: 112, director: "Paul Haggis", stars: "Sandra Bullock, Don Cheadle, Matt Dillon" },
  { title: "The Departed", year: 2006, rt: 91, audience: 97, genre: "Crime Thriller", vibe: "Cat & Mouse", rating: "R", runtime: 151, director: "Martin Scorsese", stars: "Leonardo DiCaprio, Jack Nicholson, Matt Damon" },
  { title: "American History X", year: 1998, rt: 83, audience: 97, genre: "Crime Drama", vibe: "Dark & Heavy", rating: "R", runtime: 119, director: "Tony Kaye", stars: "Edward Norton, Edward Furlong" },
  { title: "Seven Pounds", year: 2008, rt: 27, audience: 87, genre: "Drama", vibe: "Feel Good / Heavy", rating: "PG-13", runtime: 123, director: "Gabriele Muccino", stars: "Will Smith, Rosario Dawson" },
  { title: "Man on Fire", year: 2004, rt: 39, audience: 93, genre: "Action Thriller", vibe: "Revenge", rating: "R", runtime: 146, director: "Tony Scott", stars: "Denzel Washington, Dakota Fanning" },
  { title: "Deja Vu", year: 2006, rt: 69, audience: 84, genre: "Sci-Fi Thriller", vibe: "Cat & Mouse", rating: "PG-13", runtime: 128, director: "Tony Scott", stars: "Denzel Washington, Val Kilmer" },
  { title: "I Love You Man", year: 2009, rt: 80, audience: 80, genre: "Comedy", vibe: "Buddy / Laughs", rating: "R", runtime: 105, director: "John Hamburg", stars: "Paul Rudd, Jason Segel" },
  { title: "There's Something About Mary", year: 1998, rt: 83, audience: 88, genre: "Comedy", vibe: "Buddy / Laughs", rating: "R", runtime: 119, director: "Farrelly Brothers", stars: "Ben Stiller, Cameron Diaz, Matt Dillon" },
  { title: "Old School", year: 2003, rt: 60, audience: 88, genre: "Comedy", vibe: "Buddy / Laughs", rating: "R", runtime: 91, director: "Todd Phillips", stars: "Luke Wilson, Will Ferrell, Vince Vaughn" },
  { title: "Wedding Crashers", year: 2005, rt: 75, audience: 83, genre: "Comedy", vibe: "Buddy / Laughs", rating: "R", runtime: 119, director: "David Dobkin", stars: "Owen Wilson, Vince Vaughn" },
  { title: "Boondock Saints", year: 1999, rt: 23, audience: 96, genre: "Crime Action", vibe: "Cult Favorite", rating: "R", runtime: 108, director: "Troy Duffy", stars: "Willem Dafoe, Sean Patrick Flanery" },
  { title: "Hot Tub Time Machine", year: 2010, rt: 63, audience: 68, genre: "Comedy", vibe: "Buddy / Laughs", rating: "R", runtime: 101, director: "Steve Pink", stars: "John Cusack, Rob Corddry, Craig Robinson" },
  { title: "The Rip", year: 2023, rt: null, audience: null, genre: "Thriller", vibe: "Dark & Heavy", rating: "NR", runtime: null, director: "Unknown", stars: "Unknown" },
  { title: "Kingpin", year: 1996, rt: 68, audience: 82, genre: "Comedy", vibe: "Buddy / Laughs", rating: "PG-13", runtime: 113, director: "Farrelly Brothers", stars: "Woody Harrelson, Bill Murray, Randy Quaid" },
  { title: "Alpha Dog", year: 2006, rt: 61, audience: 75, genre: "Crime Drama", vibe: "Dark & Heavy", rating: "R", runtime: 117, director: "Nick Cassavetes", stars: "Emile Hirsch, Justin Timberlake, Bruce Willis" },
  { title: "Snatch", year: 2000, rt: 73, audience: 95, genre: "Crime Comedy", vibe: "Heist / Con", rating: "R", runtime: 104, director: "Guy Ritchie", stars: "Brad Pitt, Jason Statham, Benicio del Toro" },
  { title: "Limitless", year: 2011, rt: 69, audience: 84, genre: "Sci-Fi Thriller", vibe: "Cat & Mouse", rating: "PG-13", runtime: 105, director: "Neil Burger", stars: "Bradley Cooper, Robert De Niro" },
  { title: "Confidence", year: 2003, rt: 54, audience: 73, genre: "Crime Thriller", vibe: "Heist / Con", rating: "R", runtime: 97, director: "James Foley", stars: "Edward Burns, Dustin Hoffman, Rachel Weisz" },
  { title: "Bad Boys", year: 1995, rt: 43, audience: 82, genre: "Action Comedy", vibe: "Buddy / Laughs", rating: "R", runtime: 119, director: "Michael Bay", stars: "Will Smith, Martin Lawrence" },
  { title: "Yes Man", year: 2008, rt: 46, audience: 75, genre: "Comedy", vibe: "Buddy / Laughs", rating: "PG-13", runtime: 104, director: "Peyton Reed", stars: "Jim Carrey, Zooey Deschanel" },
  { title: "Unfaithful", year: 2002, rt: 68, audience: 81, genre: "Psychological Thriller", vibe: "Dark & Heavy", rating: "R", runtime: 124, director: "Adrian Lyne", stars: "Diane Lane, Richard Gere, Olivier Martinez" },
  { title: "Manhunt: Unabomber", year: 2017, rt: 90, audience: 85, genre: "Crime Drama", vibe: "Cat & Mouse", rating: "TV-14", runtime: null, director: "Greg Yaitanes", stars: "Sam Worthington, Paul Bettany" },
  { title: "Rounders", year: 1998, rt: 64, audience: 91, genre: "Crime Drama", vibe: "Cult Favorite", rating: "R", runtime: 121, director: "John Dahl", stars: "Matt Damon, Edward Norton, John Malkovich" },
  { title: "Everything Everywhere All at Once", year: 2022, rt: 95, audience: 88, genre: "Sci-Fi / Comedy", vibe: "Mind-Bender", rating: "R", runtime: 139, director: "Daniels", stars: "Michelle Yeoh, Ke Huy Quan, Jamie Lee Curtis" },
];

const VIBES = ["All", ...Array.from(new Set(movies.map(m => m.vibe))).sort()];
const GENRES = ["All", ...Array.from(new Set(movies.map(m => m.genre))).sort()];

const rtColor = (rt) => {
  if (rt === null) return "#888";
  if (rt >= 75) return "#22c55e";
  if (rt >= 50) return "#eab308";
  return "#ef4444";
};

const audienceColor = (a) => {
  if (a === null) return "#888";
  if (a >= 85) return "#22c55e";
  if (a >= 70) return "#eab308";
  return "#ef4444";
};

const selectStyle = {
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: 6,
  padding: "7px 12px",
  color: "#e5e5e5",
  fontSize: 13,
  outline: "none",
  cursor: "pointer",
};

export default function App() {
  const [watched, setWatched] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("title");
  const [sortDir, setSortDir] = useState("asc");
  const [filterVibe, setFilterVibe] = useState("All");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterWatched, setFilterWatched] = useState("All");
  const [search, setSearch] = useState("");

  // Load watched statuses from DB on page load
  useEffect(() => {
    fetch(`${API}/api/watched`)
      .then(res => res.json())
      .then(rows => {
        const map = {};
        rows.forEach(r => { map[r.title] = r.watched; });
        setWatched(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleWatched = async (title) => {
    const newVal = !watched[title];
    // Update UI immediately (optimistic update)
    setWatched(prev => ({ ...prev, [title]: newVal }));
    // Save to DB
    try {
      await fetch(`${API}/api/watched/${encodeURIComponent(title)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watched: newVal }),
      });
    } catch (err) {
      // Revert if save failed
      setWatched(prev => ({ ...prev, [title]: !newVal }));
      console.error("Failed to save:", err);
    }
  };

  const data = movies.map(m => ({ ...m, watched: watched[m.title] || false }));

  const filtered = useMemo(() => {
    return data
      .filter(m => filterVibe === "All" || m.vibe === filterVibe)
      .filter(m => filterGenre === "All" || m.genre === filterGenre)
      .filter(m => filterWatched === "All" || (filterWatched === "Watched" ? m.watched : !m.watched))
      .filter(m => !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.stars.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        let av = a[sortKey], bv = b[sortKey];
        if (av === null) av = -1;
        if (bv === null) bv = -1;
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, sortKey, sortDir, filterVibe, filterGenre, filterWatched, search]);

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span style={{ opacity: 0.3, fontSize: 10 }}>⇅</span>;
    return <span style={{ fontSize: 10 }}>{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const Th = ({ label, col }) => (
    <th
      onClick={() => handleSort(col)}
      style={{ cursor: "pointer", padding: "10px 14px", textAlign: "left", whiteSpace: "nowrap", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: sortKey === col ? "#f0c040" : "#aaa", borderBottom: "1px solid #2a2a2a", userSelect: "none" }}
    >
      {label} <SortIcon col={col} />
    </th>
  );

  const watchedCount = Object.values(watched).filter(Boolean).length;

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", fontFamily: "'Georgia', serif", color: "#e5e5e5", padding: "32px 24px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700, margin: 0, color: "#f0c040", letterSpacing: "-0.5px" }}>
          Robbie Watch List
        </h1>
        <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{movies.length} films &middot; {watchedCount} watched</p>
      </div>

      {loading && <p style={{ color: "#555", fontSize: 13 }}>Loading...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search title or actor..."
          style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, padding: "7px 12px", color: "#e5e5e5", fontSize: 13, width: 200, outline: "none" }}
        />
        <select value={filterVibe} onChange={e => setFilterVibe(e.target.value)} style={selectStyle}>
          {VIBES.map(v => <option key={v}>{v}</option>)}
        </select>
        <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)} style={selectStyle}>
          {GENRES.map(g => <option key={g}>{g}</option>)}
        </select>
        <select value={filterWatched} onChange={e => setFilterWatched(e.target.value)} style={selectStyle}>
          <option>All</option>
          <option>Watched</option>
          <option>Unwatched</option>
        </select>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#555" }}>{filtered.length} shown</span>
      </div>

      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #222" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: "#141414" }}>
            <tr>
              <Th label="Title" col="title" />
              <Th label="Year" col="year" />
              <Th label="RT%" col="rt" />
              <Th label="Audience%" col="audience" />
              <Th label="Genre" col="genre" />
              <Th label="Vibe" col="vibe" />
              <Th label="Rating" col="rating" />
              <Th label="Runtime" col="runtime" />
              <th style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa", borderBottom: "1px solid #2a2a2a" }}>Watched</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr
                key={m.title}
                style={{ background: m.watched ? "#0f1a0f" : (i % 2 === 0 ? "#111" : "#131313"), opacity: m.watched ? 0.65 : 1 }}
                onMouseEnter={e => e.currentTarget.style.background = "#1c1c1c"}
                onMouseLeave={e => e.currentTarget.style.background = m.watched ? "#0f1a0f" : (i % 2 === 0 ? "#111" : "#131313")}
              >
                <td style={{ padding: "10px 14px", fontWeight: 600, color: m.watched ? "#888" : "#f0f0f0", textDecoration: m.watched ? "line-through" : "none", whiteSpace: "nowrap" }}>{m.title}</td>
                <td style={{ padding: "10px 14px", color: "#888" }}>{m.year}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: rtColor(m.rt) }}>{m.rt !== null ? `${m.rt}%` : "—"}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: audienceColor(m.audience) }}>{m.audience !== null ? `${m.audience}%` : "—"}</td>
                <td style={{ padding: "10px 14px", color: "#bbb" }}>{m.genre}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 4, padding: "2px 8px", fontSize: 11, color: "#ccc", whiteSpace: "nowrap" }}>{m.vibe}</span>
                </td>
                <td style={{ padding: "10px 14px", color: "#888", fontSize: 12 }}>{m.rating}</td>
                <td style={{ padding: "10px 14px", color: "#888" }}>{m.runtime ? `${m.runtime}m` : "—"}</td>
                <td style={{ padding: "10px 14px", textAlign: "center" }}>
                  <button
                    onClick={() => toggleWatched(m.title)}
                    style={{ background: m.watched ? "#22c55e22" : "transparent", border: `1px solid ${m.watched ? "#22c55e" : "#333"}`, borderRadius: 4, padding: "3px 10px", color: m.watched ? "#22c55e" : "#555", fontSize: 11, cursor: "pointer" }}
                  >
                    {m.watched ? "✓ Seen" : "Mark"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 16, fontSize: 11, color: "#444", textAlign: "center" }}>
        RT% = critics &middot; Audience% = verified audience &middot; Click any column header to sort
      </p>
    </div>
  );
}