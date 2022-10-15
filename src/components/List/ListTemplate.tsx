import React from 'react';

// /. imports

interface propTypes {
    text: string;
}

// /. interfaces

const ListTemplate: React.FC<propTypes> = ({ text }) => {
    return (
        <li className="description__item">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.24255 13.4204C6.51714 14.1458 5.3401 14.1458 4.61504 13.4204L0.544058 9.34931C-0.181353 8.62423 -0.181353 7.44716 0.544058 6.72209C1.26912 5.99666 2.44616 5.99666 3.17157 6.72209L5.59708 9.1473C5.78018 9.33005 6.07742 9.33005 6.26087 9.1473L12.8284 2.57959C13.5535 1.85417 14.7305 1.85417 15.4559 2.57959C15.8043 2.92795 16 3.4006 16 3.8932C16 4.38581 15.8043 4.85845 15.4559 5.20681L7.24255 13.4204Z"
                    fill="#FECF01"
                />
            </svg>
            <a
                href="#"
                className="description__link"
            >
                {text}
            </a>
        </li>
    );
};

export default ListTemplate;
