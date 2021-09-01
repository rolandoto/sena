import React from "react";
import { Link } from "react-router-dom";

export function CardComponent(props) {
    return (
        <li className="list_item_apps">
            <Link className="list_item_apps_link" to={'/' + props.redirect}>
                <div>
                    <img src={"/assets/img/" + props.image} alt={props.alt} />
                </div>
                <div className="title">{props.title}</div>
                <div className="subtitle">{props.subtitle}</div>
            </Link>
        </li>
    );
}
