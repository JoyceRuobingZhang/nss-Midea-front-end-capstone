import React from "react"
import { Link } from "react-router-dom"
import './Footer.css'

export const Footer = () => {
    return (
        <div className="footer">
                <div className="footer_section row py-4">
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="img/logo.png" alt="" width="180" className="mb-3" />
                        <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                        <ul className="list-inline mt-4">
                            <li className="list-inline-item"><Link  target="_blank" title="twitter"><i className="fa fa-twitter"></i></Link></li>
                            <li className="list-inline-item"><Link  target="_blank" title="facebook"><i className="fa fa-facebook"></i></Link></li>
                            <li className="list-inline-item"><Link  target="_blank" title="instagram"><i className="fa fa-instagram"></i></Link></li>
                            <li className="list-inline-item"><Link  target="_blank" title="pinterest"><i className="fa fa-pinterest"></i></Link></li>
                            <li className="list-inline-item"><Link  target="_blank" title="vimeo"><i className="fa fa-vimeo"></i></Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h6 className="text-uppercase font-weight-bold mb-4">Shop</h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2"><Link className="text-muted">For Women</Link></li>
                        <li className="mb-2"><Link className="text-muted">For Men</Link></li>
                        <li className="mb-2"><Link className="text-muted">Stores</Link></li>
                        <li className="mb-2"><Link className="text-muted">Our Blog</Link></li>
                    </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2"><Link  className="text-muted">Login</Link></li>
                        <li className="mb-2"><Link  className="text-muted">Register</Link></li>
                        <li className="mb-2"><Link  className="text-muted">Wishlist</Link></li>
                        <li className="mb-2"><Link  className="text-muted">Our Products</Link></li>
                    </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-lg-0">
                    <h6 className="text-uppercase font-weight-bold mb-4">Newsletter</h6>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
                    <div className="p-1 rounded border">
                        <div className="input-group">
                        <input type="email" placeholder="Enter your email address" aria-describedby="button-addon1" className="form-control border-0 shadow-0" />
                        <div className="input-group-append">
                            <button id="button-addon1" type="submit" className="btn btn-link"><i className="fa fa-paper-plane"></i></button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* <!-- Copyrights --> */}
                <div className="bg-light py-4">
                <div className="container text-center">
                    <p className="text-muted mb-0 py-2">© All rights reserved 2021 Joyce Ruobing Zhang.</p>
                </div>
                </div>
        </div>

    )
}