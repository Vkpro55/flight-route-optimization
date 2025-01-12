import React from 'react';


const Contact = () => {
    const socialLinks = [
        {
            imgSrc: '/contact/linkedin.png',
            altText: 'LinkedIn',
            link: 'https://www.linkedin.com/in/vinod-kumar057/',
            text: 'LinkedIn',
        },
        {
            imgSrc: '/contact/github.png',
            altText: 'GitHub',
            link: 'https://github.com/Vkpro55',
            text: 'GitHub',
        },
        {
            imgSrc: '/contact/leetcodepng.png',
            altText: 'LeetCode',
            link: 'https://leetcode.com/u/VINOD057/',
            text: 'LeetCode',
        },
        {
            imgSrc: '/contact/gfg.png',
            altText: 'GFG',
            link: 'https://www.geeksforgeeks.org/user/vinodrao835/',
            text: 'GFG',
        },
    ];

    const contactInfo = [
        {
            imgSrc: '/contact/email.png',
            altText: 'Email',
            text: 'vinodrao835@gmail.com',
        },
        {
            imgSrc: '/contact/mobile.png',
            altText: 'Phone Number',
            text: '+91 78762-00463',
        },
    ];

    return (
        <section className="section-contacts">

            <div className=" grid-two-rows contact-container">
                <div className="social-div">
                    {socialLinks.map((social, index) => (
                        <div className="social-icon-div" key={index}>
                            <div className="social-icon-img">
                                <img src={social.imgSrc} alt={social.altText} />
                            </div>
                            <a
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-text"
                                style={{ fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                            >
                                {social.text}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-external-link"
                                >
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14 21 3"></path>
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="contact-list">
                    {contactInfo.map((info, index) => (
                        <div className="social-icon-div" key={index}>
                            <div className="social-icon-img">
                                <img src={info.imgSrc} alt={info.altText} />
                            </div>
                            <span>{info.text}</span>
                        </div>
                    ))}
                </div>

                <div className='credit'>
                    <p>© {new Date().getFullYear()} Built by Vinod Kumar. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
