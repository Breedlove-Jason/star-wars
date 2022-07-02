import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchBox.styles.css";

const SearchBox = (props) => {
    return (
        <div>
            <div className={"input-group container"}>
                <div className={"form-outline"}>
                    <input
                        type={"search"}
                        placeholder={props.placeholder}
                        className={props.className}
                        onChange={props.onChangeHandler}
                    />
                </div>
            </div>
        </div>
    );
};
export default SearchBox;
