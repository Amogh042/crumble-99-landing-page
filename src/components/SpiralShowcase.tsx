import { Cookie } from "@/data/cookies";
import { Link } from "react-router-dom";

interface Props {
  cookies: Cookie[];
}

export const SpiralShowcase = ({ cookies }: Props) => {
  const filmCookies = cookies.slice(0, 8);
  const visualCookies = [...filmCookies, ...filmCookies];

  return (
    <section className="film-tape-section">
      <div className="film-tape-window">
        <div className="film-tape-track">
          {visualCookies.map((cookie, index) => (
            <article className="film-tape-item" key={`${cookie.id}-${index}`}>
              <div className="film-tape-frame">
                <img src={cookie.image} alt={cookie.name} className="film-tape-image" draggable={false} />
                <div className="film-tape-hover">
                  <span className="film-tape-name">{cookie.name}</span>
                  <Link to={`/shop/${cookie.id}`} className="film-tape-link">
                    View Cookie
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

