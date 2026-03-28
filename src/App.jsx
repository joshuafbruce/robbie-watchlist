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
  if (rt === null) return "#71717a";
  if (rt >= 75) return "#4ade80";
  if (rt >= 50) return "#fb923c";
  return "#f87171";
};

const audienceColor = (a) => {
  if (a === null) return "#71717a";
  if (a >= 85) return "#4ade80";
  if (a >= 70) return "#fb923c";
  return "#f87171";
};

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #141416; }

  .app { background: #141416; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #fafafa; padding: 24px 16px; }

  .header { margin-bottom: 24px; }
  .header h1 { font-size: 22px; font-weight: 600; color: #fafafa; letter-spacing: -0.3px; }
  .header p { margin-top: 4px; color: #71717a; font-size: 14px; }

  .filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .filters input, .filters select {
    background: #27272a; border: 1px solid #3f3f46; border-radius: 8px;
    padding: 8px 12px; color: #fafafa; font-size: 14px; outline: none;
    -webkit-appearance: none; appearance: none;
  }
  .filters input { flex: 1; min-width: 140px; }
  .filters input::placeholder { color: #71717a; }
  .filters select { cursor: pointer; min-width: 120px; }
  .shown { font-size: 13px; color: #52525b; margin-left: auto; align-self: center; white-space: nowrap; }

  /* Desktop table */
  .table-wrap { display: none; overflow-x: auto; border-radius: 10px; border: 1px solid #27272a; }
  @media (min-width: 768px) {
    .table-wrap { display: block; }
    .cards { display: none; }
    .app { padding: 32px 24px; }
    .header h1 { font-size: 26px; }
    .filters input { min-width: 200px; }
  }

  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  thead { background: #18181b; }
  th {
    padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase; color: #71717a;
    border-bottom: 1px solid #27272a; cursor: pointer; user-select: none; white-space: nowrap;
  }
  th:hover { color: #a1a1aa; }
  th.active { color: #fb923c; }
  td { padding: 11px 14px; border-bottom: 1px solid #1f1f22; }
  tr:last-child td { border-bottom: none; }
  tr.watched td { opacity: 1; }
  tr.watched .title-cell { color: #52525b; text-decoration: line-through; }
  tr:not(.watched):hover td { background: #1c1c1f; }
  tr.watched { background: #141416; }

  .title-cell { font-weight: 500; color: #fafafa; white-space: nowrap; }
  .year-cell { color: #71717a; }
  .genre-cell { color: #a1a1aa; }
  .rating-cell { color: #71717a; font-size: 12px; }
  .runtime-cell { color: #71717a; }
  .vibe-pill {
    display: inline-block; background: #27272a; border: 1px solid #3f3f46;
    border-radius: 4px; padding: 2px 8px; font-size: 11px; color: #a1a1aa; white-space: nowrap;
  }

  .mark-btn {
    background: transparent; border: 1px solid #3f3f46; border-radius: 6px;
    padding: 4px 10px; font-size: 12px; color: #a1a1aa; cursor: pointer; white-space: nowrap;
  }
  .mark-btn:hover { border-color: #71717a; color: #fafafa; }
  .mark-btn.seen { background: #14532d; border-color: #166534; color: #4ade80; }

  /* Mobile cards */
  .cards { display: flex; flex-direction: column; gap: 10px; }
  .card {
    background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 14px;
  }
  .card.watched { border-color: #1f1f22; }
  .card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
  .card-title { font-size: 15px; font-weight: 500; color: #fafafa; line-height: 1.3; }
  .card.watched .card-title { color: #52525b; text-decoration: line-through; }
  .card-year { font-size: 13px; color: #71717a; margin-top: 2px; }
  .card-scores { display: flex; gap: 12px; margin-bottom: 10px; }
  .score-item { display: flex; flex-direction: column; gap: 2px; }
  .score-label { font-size: 10px; color: #52525b; text-transform: uppercase; letter-spacing: 0.05em; }
  .score-val { font-size: 15px; font-weight: 600; }
  .card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .tag {
    background: #27272a; border: 1px solid #3f3f46; border-radius: 4px;
    padding: 3px 8px; font-size: 11px; color: #a1a1aa;
  }
  .card-footer { display: flex; align-items: center; justify-content: space-between; }
  .card-meta { font-size: 12px; color: #52525b; }
  .footer-note { margin-top: 20px; font-size: 11px; color: #3f3f46; text-align: center; }
`;

export default function App() {
  const [watched, setWatched] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("title");
  const [sortDir, setSortDir] = useState("asc");
  const [filterVibe, setFilterVibe] = useState("All");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterWatched, setFilterWatched] = useState("All");
  const [search, setSearch] = useState("");

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
    setWatched(prev => ({ ...prev, [title]: newVal }));
    try {
      await fetch(`${API}/api/watched/${encodeURIComponent(title)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watched: newVal }),
      });
    } catch {
      setWatched(prev => ({ ...prev, [title]: !newVal }));
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

  const watchedCount = Object.values(watched).filter(Boolean).length;

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === col ? 1 : 0.3, fontSize: 10 }}>
      {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "⇅"}
    </span>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <h1>Robbie Watch List</h1>
          <p>{movies.length} films &middot; {watchedCount} watched{loading ? " · loading..." : ""}</p>
        </div>

        <div className="filters">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search title or actor..."
          />
          <select value={filterVibe} onChange={e => setFilterVibe(e.target.value)}>
            {VIBES.map(v => <option key={v}>{v}</option>)}
          </select>
          <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)}>
            {GENRES.map(g => <option key={g}>{g}</option>)}
          </select>
          <select value={filterWatched} onChange={e => setFilterWatched(e.target.value)}>
            <option>All</option>
            <option>Watched</option>
            <option>Unwatched</option>
          </select>
          <span className="shown">{filtered.length} shown</span>
        </div>

        {/* Desktop table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {[["Title","title"],["Year","year"],["RT%","rt"],["Audience%","audience"],["Genre","genre"],["Vibe","vibe"],["Rating","rating"],["Runtime","runtime"]].map(([label, col]) => (
                  <th key={col} className={sortKey === col ? "active" : ""} onClick={() => handleSort(col)}>
                    {label}<SortIcon col={col} />
                  </th>
                ))}
                <th>Watched</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.title} className={m.watched ? "watched" : ""}>
                  <td className="title-cell">{m.title}</td>
                  <td className="year-cell">{m.year}</td>
                  <td style={{ color: rtColor(m.rt), fontWeight: 600 }}>{m.rt !== null ? `${m.rt}%` : "—"}</td>
                  <td style={{ color: audienceColor(m.audience), fontWeight: 600 }}>{m.audience !== null ? `${m.audience}%` : "—"}</td>
                  <td className="genre-cell">{m.genre}</td>
                  <td><span className="vibe-pill">{m.vibe}</span></td>
                  <td className="rating-cell">{m.rating}</td>
                  <td className="runtime-cell">{m.runtime ? `${m.runtime}m` : "—"}</td>
                  <td>
                    <button className={`mark-btn${m.watched ? " seen" : ""}`} onClick={() => toggleWatched(m.title)}>
                      {m.watched ? "✓ Seen" : "Mark"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="cards">
          {filtered.map(m => (
            <div key={m.title} className={`card${m.watched ? " watched" : ""}`}>
              <div className="card-top">
                <div>
                  <div className="card-title">{m.title}</div>
                  <div className="card-year">{m.year} &middot; {m.rating} &middot; {m.runtime ? `${m.runtime}m` : "—"}</div>
                </div>
                <button className={`mark-btn${m.watched ? " seen" : ""}`} onClick={() => toggleWatched(m.title)}>
                  {m.watched ? "✓ Seen" : "Mark"}
                </button>
              </div>
              <div className="card-scores">
                <div className="score-item">
                  <span className="score-label">RT</span>
                  <span className="score-val" style={{ color: rtColor(m.rt) }}>{m.rt !== null ? `${m.rt}%` : "—"}</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Audience</span>
                  <span className="score-val" style={{ color: audienceColor(m.audience) }}>{m.audience !== null ? `${m.audience}%` : "—"}</span>
                </div>
              </div>
              <div className="card-tags">
                <span className="tag">{m.genre}</span>
                <span className="tag">{m.vibe}</span>
              </div>
              <div className="card-footer">
                <span className="card-meta">{m.director}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="footer-note">RT% = critics &middot; Audience% = verified audience &middot; Click any column header to sort</p>
      </div>
    </>
  );
}
