import React from 'react';
import Image from "next/image";
import style from "./Stars.module.css";
import yellow_star from "../../../public/star/Star19.svg";
import black_star from "../../../public/star/Star20.svg";

export const Stars = ({ x }) => {
    const yellowStars = Array(x).fill(null);
    const blackStars = Array(5 - x).fill(null);

    return (
        <div>
            <div className={style.starcontainer}>
                {yellowStars.map((_, index) => (
                    <Image key={index} src={yellow_star} alt="star" className={style.star} />
                ))}
                {blackStars.map((_, index) => (
                    <Image key={index} src={black_star} alt="star" className={style.star} />
                ))}
            </div>
        </div>
    );
};
