import React from "react";
import "./Bottom.css";

function Bottom() {
  return (
    <body className="Footer">
      <div>
        <footer class="footer">
          <div class="footer__addr">
            <img
              className="Logo"
              src="https://www.linkpicture.com/q/SecureKloud_Technologies_Limited_Logo.jpg"
            />

            <h2>Contact</h2>

            <address>
              T-nagar, Chennai.
              <br />
              <a class="footer__btn" href="mailto:assetwarrantyweb3@gmail.com">
                Email Us
              </a>
            </address>
          </div>

          <ul class="footer__nav">
            <li class="nav__item">
              <h2 class="nav__title">Media</h2>

              <ul class="nav__ul">
                <li>
                  <a href="#">Online</a>
                </li>{" "}
                <br />
                <li>
                  <a href="#">Print</a>
                </li>{" "}
                <br />
                <li>
                  <a href="#">Alternative Ads</a>
                </li>
              </ul>
            </li>

            <li class="nav__item nav__item--extra">
              <h2 class="nav__title">Technology</h2>

              <ul class="nav__ul nav__ul--extra">
                <li>
                  <a href="#">Hardware Design</a>
                </li>
                <br />

                <li>
                  <a href="#">Software Design</a>
                </li>
                <br />

                <li>
                  <a href="#">Digital Signage</a>
                </li>
                <br />

                <li>
                  <a href="#">Automation</a>
                </li>
                <br />

                <li>
                  <a href="#">Artificial Intelligence</a>
                </li>
                <br />

                <li>
                  <a href="#">IoT</a>
                </li>
              </ul>
            </li>

            <li class="nav__item">
              <h2 class="nav__title">Legal</h2>

              <ul class="nav__ul">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <br />

                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <br />

                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </li>
          </ul>

          <div class="legal">
            <p>Copyright &copy; 2023 | Asset Warranty</p>
          </div>
        </footer>
      </div>
    </body>
  );
}

export default Bottom;
