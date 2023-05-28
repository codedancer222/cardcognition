import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import fetchCardData from "../helpers/fetchCardData";

function Card({ name, score, scryfall_id }) {
    const [imageUrl, setImageUrl] = React.useState("");
    const [affiliateLink, setAffiliateLink] = React.useState("");
    const [cardPrice, setCardPrice] = React.useState(0);
    const [foilCardPrice, setFoilCardPrice] = React.useState(0);
    const [isLegendary, setIsLegendary] = React.useState(false);

    useEffect(() => {
        const fetchScryfallData = async () => {
            const data = await fetchCardData(scryfall_id);
            const affiliateCode = "CARDCOGNITION";

            setImageUrl(data.image_uris.normal);
            setCardPrice(data.prices.usd);
            setFoilCardPrice(data.prices.usd_foil);
            setAffiliateLink(`https://www.tcgplayer.com/product/${data.tcgplayer_id}?utm_campaign=affiliate&utm_medium=${affiliateCode}&utm_source=${affiliateCode}`);

            if (data.type_line.includes("Legendary")) {
                setIsLegendary(true);
            }
        };

        fetchScryfallData();
    }, [scryfall_id]);

    const handleClick = () => {
        // Open affiliate link in new tab
        window.open(affiliateLink, "_blank");
    };

    return (
        <div className="card">
            {
                isLegendary && score
                    ? (
                        <Link to={`/commander/${name}`} className="commander-link">
                            <p>{name} - {score}x</p>
                        </Link>
                    )
                    : isLegendary && !score
                        ? (
                            <Link to={`/commander/${name}`} className="commander-link">
                                <p>{name}</p>
                            </Link>
                        )
                        : !isLegendary && score
                            ? (
                                <p>{name} - {score}x</p>
                            )
                            : (
                                <p>{name}</p>
                            )
            }
            <img src={imageUrl} alt={name} onClick={handleClick} />
            <a href={affiliateLink} target="_blank" rel="noreferrer">Buy on TCGplayer - ${(cardPrice !== null) ? cardPrice : foilCardPrice}</a>
        </div>
    );
}

export default Card;