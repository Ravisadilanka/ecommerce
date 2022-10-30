import React, {useEffect, useState} from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { HeroBanner, Product } from '../../components';


import BlockContent from "@sanity/block-content-to-react";
import { client, urlFor} from '../../lib/client'
import { useStateContext } from '../../context/StateContext'


const ProductDetails = ({product,products}) => {
    const {image, name, specification,description, price,rating} = product;
    const [index, setIndex] = useState(0);
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    }

    const serializers = {
        types: {
            block: (props) => {
            const { style = "normal" } = props.node;

            if (/^h\d/.test(style)) {
                const level = style.replace(/[^\d]/g, "");
                return React.createElement(
                style,
                { className: `heading-${level}` },
                props.children
                );
            }
    
            if (style === "blockquote") {
                return <blockquote>- {props.children}</blockquote>;
            }

            // Fall back to default handling
            return BlockContent.defaultSerializers.types.block(props);
            },
            code: (props) =>
            console.log("code block", props) || (
                <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
                </pre>
            )
        },
        list: (props) =>
            console.log("list", props) ||
            (props.type === "bullet" ? (
            <ul>{props.children}</ul>
            ) : (
            <ol>{props.children}</ol>
            )),
        listItem: (props) =>
            console.log("list", props) ||
            (props.type === "bullet" ? (
            <li>{props.children}</li>
            ) : (
            <li>{props.children}</li>
            )),
        marks: {
            strong: (props) =>
            console.log("strong", props) || <strong>{props.children}</strong>,
            em: (props) => console.log("em", props) || <em>{props.children}</em>,
            code: (props) => console.log("code", props) || <code>{props.children}</code>
        }
        };
        

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className = "product-detail-image"/>
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                            key={i}
                            src={urlFor(item)}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)}
                        />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Specification: </h4>
                    <div>
                    <BlockContent
                        blocks={product.specification.filter(({ _type }) => _type === "block")}
                    />
                    </div>
                    <p className='price'>${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product,qty)}> Add to Cart</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}> Buy Now</button>
                    </div>
                </div>
            </div>
            <h4>Description: </h4>
            <div>
                <BlockContent
                    blocks={product.description.filter(({ _type }) => _type === "block")}
                />
            </div>
            
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export const getStaticPaths = async() => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product);

    return {
        props: { products, product}
    }
}
export default ProductDetails