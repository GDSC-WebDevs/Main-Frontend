

import style from "./ExperienceCard.module.css";
import React from 'react';

import Image from "next/image";

import { Stars } from "../Stars/Stars";

import arrow from "../../../public/Arrow_experience.svg";

export const ExperienceCard = ({ name, stars,ctcNum, positionData, positionData2, image, companyImage }) => {
    return (
        <div className={style.ExperienceCard}>
            
            <div className={style.box1}></div>
            <div className={style.box11}>
                <Stars x={stars} />
                <div className={style.name_company}>
                    <div className={style.img_div}>
                        <img src={image} alt="Avatar" className={style.img} />
                    </div>
                    <div className={style.name}>
                        <p>Name</p>
                        <h2>{name}</h2>
                    </div>
                    <div className={style.company}>
                        <p>Company</p>
                        <img src={companyImage} alt="" />
                    </div>
                    <div className={style.details}>
                        <div className={style.ctc}>
                            <p>CTC</p>
                            <div className={style.ctc_box}>
                                <p className={style.ctc_num}>{ctcNum}</p>
                            </div>
                        </div>
                        <div className={style.position}>
                            <p>Position</p>
                            <div className={style.position_box}>
                                <p className={style.position_num}>{positionData}</p>
                            </div>
                        </div>
                        <div className={style.position2}>
                            <p>Position</p>
                            <div className={style.position_box2}>
                                <p className={style.position_num2}>{positionData2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.box2}></div>
            <a className={style.circle} href={"https://www.google.com/"}>
                <Image src={arrow} alt= "arrow" className={style.arrow}/>
            </a>
            <div className={style.circle2}></div>
        </div>
    );
};
