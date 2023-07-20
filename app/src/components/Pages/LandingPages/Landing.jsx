import React from "react";
import "./Landing.css";
// import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from "swiper";
import "../../Repeated/font2.css";
import { useNavigate } from "react-router-dom";
import Bottom from "../../Repeated/Bottom";
import Tes from "../../Repeated/Tes";
import Qr from "./Qr";
import LandHead from "../../Responsive Header/LandHead";
// SwiperCore.use([EffectCoverflow, Pagination]);

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LandHead />

      <div className="fr">
        <br />
        <div className="fri">
          <div className="frie">
            <br />
            <br />
            <br />
            <h4
              style={{
                fontSize: "12",
                color: "white",
                fontFamily: "Axiforma",
              }}>
              Asset Tracking Software
            </h4>
            <br />
            <h3 className="t-1" style={{ fontFamily: "Axiforma" }}>
              " Protect Your Assets, Secure Your Peace of Mind - Get Asset
              Warranty Today! "
            </h3>
          </div>

          <div className="frein">
            <img
              className="vv1"
              src="https://d35oklvbqvhhu3.cloudfront.net/default/feature-asset-tracking-software.png"
              alt="Asset"
            />
          </div>
          <br />
          <br />
        </div>
        <br />
      </div>
      <br />
      <br />

      <div className="zin">
        <br />
        <h1 className="A1" style={{ fontFamily: "Axiforma", opacity: "0.8" }}>
          Asset Warranty
        </h1>
        <br />

        <p className="A2" style={{ fontFamily: "Axiforma" }}>
          {/* Asset Warranty is a blockchain-based application to manage product
          details and ownership transfers for manufacturers, retailers, and
          customers. The platform securely stores product information on the
          blockchain and updates ownership information when a customer purchases
          a product. The unique QR code allows easy verification of a product's
          originality and ownership. The solution aims to transform the product
          management industry by providing an efficient and transparent system
          for managing product details and ownership transfers. */}
          Asset Warranty is a blockchain-based platform that allows
          manufacturers, dealers, and customers to track product data and
          ownership transfers. When a customer purchases a product, the platform
          securely records product information on the blockchain and changes
          ownership information. The unique QR code enables simple
          authentication of a product's originality and ownership. The solution
          seeks to revolutionize the product management business by offering an
          effective and transparent mechanism for storing product data and
          ownership transfers.
        </p>
        <br />

        <Tes />
        <br />
      </div>
      <br />

      <br />
      <br />
      <br />
      <div className="wavebc">
        <br />
        <br />
        <br />
        <br />
        <div className="concoc">
          <div className="cont7">
            <div>
              <img
                className="cont71"
                src="https://www.linkpicture.com/q/MicrosoftTeams-image-1_59.png"
                alt=""
              />
            </div>
          </div>
          <div className="floating1">
            <div className="flow1" style={{ fontFamily: "Axiforma" }}>
              <h2
                style={{
                  fontFamily: "Axiforma",
                  color: "red",
                  opacity: "0.8",
                }}>
                Asset Warranty Process
              </h2>
              <h4 style={{ fontFamily: "Helvetica Now", opacity: "0.8" }}>
                "From Manufacture to Purchase"
              </h4>
            </div>
          </div>
        </div>
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="cont-3">
        <br />
        <br />
        <div className="aaa">
          <h5
            className=" aa1"
            style={{
              color: "blue",
              fontFamily: "Axiforma",
              fontSize: "16px",
            }}>
            INTEGRATION
          </h5>
          <h2 style={{ fontFamily: "Axiforma" }}>Integration for day</h2>
          <p
            style={{
              width: "450px",
              color: "gray",
              fontFamily: "Helvetica Now",
            }}>
            "Peace of Mind for Your Assets: Asset Warranty Coverage You Can
            Count On"
          </p>
        </div>
        <br />
        <br />
        <div className="xia">
          <div class="xib">
            <div class="xic" style={{ width: "55px" }}>
              <img
                className="kl"
                src="https://www.linkpicture.com/q/nodejs-removebg-preview.jpg"
                alt=""
              />
            </div>
            <div class="xic" style={{ width: "65px" }}>
              <img
                className="qa"
                src="https://www.linkpicture.com/q/react-removebg-preview.jpg"
                alt=""
              />
            </div>
            <div class="xic" style={{ width: "55px" }}>
              <img
                className="df"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAArlBMVEUkS4H///+3tbH7+/vCwb3c29k4WYcoToK6ubXv7+40V4YrUIPT0s8tUoR7iZ3Z2NZBYIrJyMXr6umysa/29vVUbZCipqpne5fFw8CZn6dZcZKGkqFLZ42trq7h4N/n5uVugJlEY4uBjp/a3+Z5jalrgaGSmqVofJedoqlYcJLr7vLQ1t++x9O1v82VprxzhJuJmrKls8e6xdXV2+KdrcFziaZkfZ/Iz9eClK2Pn7Wle1QzAAANpUlEQVR4nNVdaWPaPAwODTcpEO5yQzd6rl13dfv/f+wNIbYl2TktIO/zbYVBHqzLsiQ7lbPAHQ02Nc+fNW8kmtWZ79XWg9F5vtFh/jx3EDx/FTy/Ac2Zt265zF/MSaS19qqJDBCq3oaTDBeRVs1PXoZzk+Eg4m68AiQEZr0WwzPYE3HXfnESYmF69hbAjoi7sWdxgm8rYzZEBjYSpaHpWYlYcSKbZAv1eOhOx7t6u+Ec0bht1/v95dNDd3GYxP6f6vryRNbxNIaH7rzfcRLQn+4fY5alVlTCChEZ9eJkatId15MoKDR22wMnlQJEWl6MMHXHt9lICHTG3ZWBSiEBy01kZKQxXMxzkhDob3WdqRZQ+5xE3J6JxmLcKMbihJ2+Ll5ux5KPyNqgG4/TgmsB0Hii+pJbvvIQac10kdrvrFmc0H4nyzLLJ1/Zibi6ckymViJF0HkgVHpnITLQpOpuzMgiRGOO3Us1h6ZkJKIvx+OSm0aIOV6V7JqSjUiL+vHJ01loBOi8D+EX+VndYyYia0JjNT0XjSPqiyLilYGIS0P1rr29TcYS+sjmgInIiIjVIWMwZYNGN7eipBLZEKman5/GEUuo9B4DERKSLM4tVRK3UFNm6SqfQgRb3dXZbJUJ0BJXU5kkEnFxTLJoX5JHELUAnU81XklEXKTmw7PaXCNuQSjZTGGSQATzmPQvziOwXvvMTOKJYB6Hi2k5xjSrdMUSwTzer0MjwFJFLIkaH0cE6fmQPc7NgZ1ikmSFY4ggHqtrqIcCWBM/NxEYXk0uEJNkZRK/1zITgX7w8UpqDjBWTxMbdxmJ1ACPu8Sc4YXwpJ4nbidvIjKAZrcMPIJwRT5QnDsxEBmB3fmBM7tgg22a6TIQAQ7ksRzrcYQKhs1BvU4EKPrk+nou0VAJlk0mImAjtbpwtJsMFQsb1YQSAQoyvK4f1NCX7mSWgQjwhBfa1GaHcie1VCIg8dO99nPrUCkJXbgwkZHicVcWwwvQkGqiB12YiBKscim6gFITLVRBRIDFOk9m1xrSLzapW4REwF7qehupFNzFuUVIROWwHkuoICfUpXC1YokoTR9eeweSALmJ92OJqNjk8omfHJDCNYghohbk8drPmoideMxZDBFleksWmlDsjUsiiagFKaFLR2gbl0QSkRqyKlHsboZ0JhsDEbUgD9d+zlR0RJq+aiAiF2RSWheiIHfwA42IK7chFz0CKQphgn2NiAzfJ9d+xkyQO5MWJSKjrNLtpsyYaEtyItL6fy0I0JIRJiJVvXhwcttfPn39++/jx8v96C/jI8dALEkPExGqPiycx3qCzslN3JW9VJ6fn+/vf758fr4Wjk5F7NhERGSO1GIb8g0y+Uh445eM70tGQ/iSDSQiJcsifG+jfED8BhO9z2I/Ldy7D4kIyToU/1z8S1fuY90qXLkvFl93K3ZYI0VESpad7X2pZHhGqEv3Vl8nckM1RURIVnFVD7GDREbm0LPxDN5jF0T0o6euKiLCGy6sPthxfqXr+z/wjm+WXyey2i1BZMQjWYHYwp+7Yio/7YPXXdvEgLDAPUFExlnWhyFfIZEXwxs+wev/bL+tM4Sy5SgVsbJZ+oNWfmsvQ6LP9mdIeyhbjlIRhtwJFJ3KM9V3JHp/7L9tCe2WU3GFZHHkHL5DJr/Iix/gtU+GLxMB1+xERHiRFcdHN+4hE/zTLNNMQW4I7+6GRMShuq3xPQEFj1jfIUe6WMUg8inrkIjQdab0Igoev4IX/iapT0FErsQLiQhdZ2o7QEEhME11eA6gG7RiiGSrGRIRus6VPfkNl+RN/vkV/DU+pMwJEaYEBtgRu1y+TS4KHoX7/gP/yFf+tZIG2BGnVHu2D9/BZ47MbAe6kOLbKQ1RCBxsShwRoGz5Pv0NMjk5PhhPJm+E82EplcQRx1SMZyLIg4f6jhaJNTURxVujiiOsL2fZIlKI74Gb/AmZseZkF8KTOOJYhKvpKwQ0UUG4jnbBvCnAufAkjnAjrE0hfeg0frTRvxi/JjAikbZXFRHeNh3oxisJ8ZclVB+A64AyswmfnuDgEcB6OwUwB00AAwd15R3Yfq+xmQdXkBVgeQefvOeQ9sI91zd9GIl8Tf+P2dAnPbG+QxsMuXqP2s8GHqZ9fBHcdslTB0QqLdrUNuGh8ttAhMnGz2m3td8K81o6FRZV+dR4sGynGlPaAO8fsw/RQQ/t/HxnUJUdrUQacQRZcyMNdapLZ2qstvbf+Y8QsclZR6jTvndfnCKqEg7adG+vKjjzaJmzPqLzHkcDVQe5dLbGo61uouRQ5aflp91uiY6jiTC4ppFOO1lY5Wc7xAJbOZEG7qrWxkLQul8qYDYB2Bv5bJut+pLouE8LZgmREbXEFj2t/QqFhbbvyGgbbbgFES2qJTbFprofsYq0pnS4RVwFne5N7HpB/1R0fLf5QNSGrImXIqLNbjlY+S+q6SfYuUSqKLBGXhKhHtG2NZd6wxMsgxTNkajhPBERTcntloNkSAFsz9v6dJ6V50IiNfKqfSz/w8yDITk3Jc8a2a/wnJ1K1bv1sdg8hgfHnr1+R6hUT9GvNruFYzqFUdNDvNp/uDMlTv4oX86GuA6WHeL3WB48Gew2tcTNAd2z2yp5CKTp98R+8Wx3qSVuOshcMW3Y0anVknoUhvPcI7AlnjnQDTKlUFAq6IPUEfAd86BNlu+o9rAVUxcPSs6FZwgvmAnXwRuUL0+eWN10udpZUbo0DHh3mAhD0UOEhrRfNUfUC7ClS1HKOtre/sJMGE9IRBPGRp7qshFBKcaoJAvXCcYVcxWBKGVuyXN2rvYwVN8gS7LQCQlnKlsUAAeePdL2O54PxppeN/6ZoVZLIjLC1YCI0HYeo4h+eqALqLSD8WA3cvH+MWiMfDtLXvYWKgNyGK+YCdf5RRTV945EIt/O0gCDNB25cJKKsC1oFBBG60gk2oxwVAft4LOSOJeEXDyJeVHDMToSiZSEo14LunCXSA8JuVgqz5TRCjdW0T/sLQkKqrSMCQm5WFqHQAlHRSqJ9aluR6t4wMAhl20qOMSd0PWQSKQk1lWmhhoUBOQrWc4TG5EwDU5EhCexjOWQXTKqAD4gZajlEHWmLu5WsNxVoRSp0U+08ZLYH/y8SxVB/SN2Bhjp8pv5PSjCZwjnIxWpCSJRxezQZq3TND0ECbmsUsEBbkXoK4hw7EmQpsfqMc532ZagRV4k7LM6ZRojA2xRDlhP1fQTcAbSMhW8kMZXENlYO3ek6QnhRx/nhK2ccGOoJCsiIlp1C8sWOgxJ/J3xeZxVOA8lS2TjPTufiDU9cSNLzqxtYsdIsjxIRFT6F9Q+lCJNyfbgGhWLVDC0WeqgJ5Ktgjv35dOf31++v318+7x/Tk2JvlRGUWvoy+fra/Ed1sPpkUGz2BE1a3W/OCbKGwIiomPsf9IG7qg4a4SJCFfC0Gh1Ici0AyEi1L3E03YQ6tHzDigRkXEs+1QUgT1SdVTmFEWOpZwQpqEdefW1TkRYYL7+i3MiWhA1LwwQEWfUJR8dFEJoiBqbCwvPoiXhaX87Lw50QVBRjVgS1saFs2CsLQieQRctCVNi/nwQYw7hRD1UryWW5JqzvLNAHOjC4jNERCxJyQchkdkCBiKytb200w1DiFoU88SzE8SU9TKb4Ch8J2MBCRH+9kp21MkcETMR2YK8vfbzxkIIFikzpUSEvpd25qSwWNVKMhE5mLWkzkRsp7T58fpwb1EuVErL1RbFv9rdBDoRORW7hG6xM4kRLOPceOFMyjbcOwhNDnGCZb6SQAhXmcbGh5AFgOnDvbFwlSwTIVvdTNeQGG+7kMVopVJ4OfnTeMVNyv0jJUpzycJl830XMTfCyJttSmO6VAG2+Ta+GCJSTYYlGVeuru0wXhERf2uSLHUsx+B11dIad0tP7D1Wcob88Ppb+Eba5SNJRNTw9as7xo4q8I2//ynhrjc1k/m6a9JWLSMJd4sl3b4nq82H1xwC3FdNYkm3vSVeI6iuFyvFXW+J9+8lX+yoOmSulX5UZrfo7Xt0Te6uEUHWQUdVyr2hKXeGgjt1J5dX+QdFI/Um1xQi6Hbg7WVpwOVIvxk8jQi614ql3ScrgHZkuSM4nQhksrpYDNnPe2tzBiKoS3F/kUvTOmhcyCzLPdpZiKBrmy9xZzMeF5LlwuaMRHBf9ZmumJdYoi7WZkzYXowIudrcboJCCg3c95lJrHIQoe2872eyX0+kpzjV6uYnQtr2h11+Kh06g6Yad6+mFRGtqXfPK2BtOi3kppd+mXkhIvoshQXflmtMR9DczHIsR14ieuP7ZMuxLP0uXYzMxqooEX0Uwc3d1C4ubk9pf3peqSpERB8OEeAwLSpj/a2BBR1CcyYi+vSUI1b7cd6F2U0XmkQd4edTDgsi+rikSMi682wa014+LOgQCjsaBYkEVGpGKoF/Obw/9RPWpj/vHozrYEejMJEA61n889xM7hbd7XQ6n4+Xy+V4Pn3v7heHx0kChQDNXgHdsCcSWDCzhBWEv85tqbiIBNho1rgYqjWLxeAgEixLLUnEsrHoFdYMRiIBRmuLdWFhUeEhEsDdeAX0pemvbSVKgonIEa1Nz8/OZuateZYiAiOREO5g7aUoTdWrbdgWQoKbyAmtwWZd63me71er0SI1qzPf660H/BRO+A8dA9kQIiQlcAAAAABJRU5ErkJggg=="
                alt=""
              />
            </div>
            <div class="xic" style={{ width: "55px" }}>
              <img
                className="qw"
                src="https://www.linkpicture.com/q/DB-removebg-preview_1.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="cont6">
        <br />
        <br />
        <div className="cont5">
          <img
            className="imgimg"
            src="https://velosiaims.com/wp-content/uploads/2022/07/asset-mgmt-scaled.jpg"
            alt=""
          />

          <p className="A3" style={{ fontFamily: "Axiforma" }}>
            {/* Our program has enabled us to effectively manage the tracking of
            assets that are consuming valuable resources, both in terms of time
            and money. With all the relevant data stored in one place, we are
            able to gain a comprehensive understanding of the equipment's
            overall costs and the duration of its use. */}
            Our programme has enabled us to effectively manage the tracking of
            assets that are consuming valuable resources, both in terms of time
            and money. With all the relevant data stored in one place, we are
            able to gain a comprehensive understanding of the equipment's
            overall costs and the duration of its use.
          </p>
        </div>
        <br />
        <br />
        <br />
      </div>

      <div>
        <Bottom />
      </div>
    </div>
  );
};

export default Landing;
