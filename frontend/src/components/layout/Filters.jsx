import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceQueryParams } from '../../helpers/helpers';
import { PRODUCT_CATEGORIES } from "../../constants/constants"
import { Rating } from 'react-simple-star-rating'

const Filters = () => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    ///Handle Price Filter
    const handleButtonClick = (e) => {
        e.preventDefault();

        searchParams = getPriceQueryParams(searchParams, "min", min)
        searchParams = getPriceQueryParams(searchParams, "max", max)

        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
    }

    /// Handle Category & Ratings filter
    const handleClick = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name);

        checkboxes.forEach((item) => {
            if(item !== checkbox) item.checked = false
        })

        if(checkbox.checked === false) {
           /// delete the filter from query
           if(searchParams.has(checkbox.name)){
            searchParams.delete(checkbox.name)
            const path = window.location.pathname + "?" + searchParams.toString();
            navigate(path);
           }

        } else {
            ///Set new filter value if alredy there
            if(searchParams.has(checkbox.name)){
                searchParams.set(checkbox.name, checkbox.value)
            } else {
                //append new filter
                searchParams.append(checkbox.name, checkbox.value)
            }

            const path = window.location.pathname + "?" + searchParams.toString();
            navigate(path);
        }
    }

    const defaultCheckHandler = ( checkboxType, checkboxValue) => {
        const value = searchParams.get(checkboxType);

        if(value === checkboxValue) return true;
        return false;
    }

    useEffect(() => {
      searchParams.has("min") && setMin(searchParams.has("min"))
      searchParams.has("max") && setMax(searchParams.has("max"))
    }, [])

    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <h5 className="filter-heading mb-3">Price</h5>
            <form
                id="filter_form"
                className="px-2"
                action="your_action_url_here"
                method="get"
            >
                <div className="row">
                <div className="col">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Min ($)"
                    name="min"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    />
                </div>
                <div className="col">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Max ($)"
                    name="max"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    />
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary" onClick={handleButtonClick}>GO</button>
                </div>
                </div>
            </form>
            <hr />
            <h5 className="mb-3">Category</h5>
            {PRODUCT_CATEGORIES?.map((category) => (
                <div className="form-check" key={category}>
                    <input
                    className="form-check-input"
                    type="checkbox"
                    name="category"
                    id="check4"
                    value={category}
                    defaultChecked={defaultCheckHandler("category", category)}
                    onClick={(e) => handleClick(e.target)}
                    />
                    <label className="form-check-label" htmlFor="check4"> {category} </label>
                </div>
            ))}
            

            <hr />
            <h5 className="mb-3">Ratings</h5>
            {[5,4,3,2,1].map((rating) => (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="ratings"
                        id="check7"
                        value={rating}
                        defaultChecked={defaultCheckHandler("ratings", rating.toString())}
                        onClick={(e) => handleClick(e.target)}
                    />
                    <label className="form-check-label" htmlFor="check7">
                        <span className="star-rating">
                        <Rating
                            initialValue={rating}
                            readonly
                            size={20}
                            SVGstyle={{ display: "inline-block" }}
                        />
                        </span>
                    </label>
                </div>
            ))}
           
    </div>

    )
}

export default Filters;