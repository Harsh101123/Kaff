import { Link } from '@remix-run/react';

const HelpHomeSection = () => {
    return (
        <section className="do_you_need_help_sec padding">
            <div className="container">
                <div className="do_you_need_help_grid">
                    <div className="do_you_need_help_box">
                        <h2>Do you need <br /> help?</h2>
                    </div>
                    <div className="do_you_need_help_box">
                        <p>Contact us using your preferred method</p>
                        <div className="do_you_need_help_btn">
                            <Link to="#" className="kaff_btn_white">Contact Us</Link>
                            <Link to="#" className="kaff_btn">Find a Reseller</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpHomeSection;