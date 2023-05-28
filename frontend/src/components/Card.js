import React from "react";
import { useEffect } from "react";
import fetchCardData from "../helpers/fetchCardData";

function Card({ name, score, scryfall_id }) {
    const [imageUrl, setImageUrl] = React.useState("");
    const [affiliateLink, setAffiliateLink] = React.useState("");
    const [cardPrice, setCardPrice] = React.useState(0);
    const [foilCardPrice, setFoilCardPrice] = React.useState(0);

    useEffect(() => {
        const fetchScryfallData = async () => {
            const data = await fetchCardData(scryfall_id);
            const affiliateCode = "CARDCOGNITION";

            setImageUrl(data.image_uris.normal);
            setCardPrice(data.prices.usd);
            setFoilCardPrice(data.prices.usd_foil);
            setAffiliateLink(`https://www.tcgplayer.com/product/${data.tcgplayer_id}?utm_campaign=affiliate&utm_medium=${affiliateCode}&utm_source=${affiliateCode}`);
        };

        fetchScryfallData();
    }, [scryfall_id]);

    const handleClick = () => {
        // Open affiliate link in new tab
        window.open(affiliateLink, "_blank");
    };

    return (
        <div className="card">
            {(score) ? (<p>{name} - {score}</p>) : (<p>{name}</p>)}
            <img src={imageUrl} alt={name} onClick={handleClick} />
            <a href={affiliateLink} target="_blank" rel="noreferrer">Buy on TCGplayer - ${(cardPrice !== null) ? cardPrice : foilCardPrice}</a>
        </div>
    );
}

export default Card;