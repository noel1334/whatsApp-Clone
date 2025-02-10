import CallItem from "./CallItem";

const FavoriteList = ({ favorites }) => {
  return (
    <>
      {favorites.length > 0 && (
        <>
          <div className="section-title">Favorites</div>
          <ul className="call-list">
            {favorites.map((favorite) => (
              <CallItem key={favorite.id} call={favorite} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FavoriteList;
