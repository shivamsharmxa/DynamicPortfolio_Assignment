import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";
import { Formik } from 'formik';
import appData from "@data/app.json";

const Contact = () => {
  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-2.jpg"}
      rightPanelImg={"/img/person/7.png"}
    >
        <PageBanner pageTitle={"Get in touch!"} align={"center"} />
      
        {/* info */}
        <div>
            <ul className="mil-puplication-details mil-up mil-mb-90">
                <li>
                    <span className="mil-upper mil-accent">Call: </span>&nbsp;&nbsp;
                    <span className="mil-upper mil-dark">+27(034)765 64 X5</span>
                </li>
                <li>
                    <span className="mil-upper mil-accent">Write: </span>&nbsp;&nbsp;
                    <span className="mil-upper mil-dark">miller.themes@gmail.com</span>
                </li>
            </ul>
        </div>

        {/* map */}
        <div className="mil-map mil-mb-90">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1396.5769090312324!2d-73.6519672!3d45.5673453!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91f8abc30e0ff%3A0xfc6d9cbb49022e9c!2sManoir%20Saint-Joseph!5e0!3m2!1sen!2sua!4v1685485811069!5m2!1sen!2sua" 
              style={{"border": "0"}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
            />
        </div>
        {/* map end */}

        <div className="mil-section-title mil-up">
            <div className="mil-divider" />
            <h3>Let's Talk</h3>
        </div>

        {/* contact */}
        <div id="contact" className="mil-p-90-60">
        <Formik
            initialValues = {{ email: '', name: '', message: '' }}
            validate = { values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit = {( values, { setSubmitting } ) => {
                const form = document.getElementById("contactForm");
                const status = document.getElementById("contactFormStatus");
                const data = new FormData();

                data.append('name', values.name);
                data.append('email', values.email);
                data.append('message', values.message);

                fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        status.innerHTML = "Thanks for your submission!";
                        form.reset()
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                            } else {
                                status.innerHTML = "Oops! There was a problem submitting your form"
                            }
                        })
                    }
                }).catch(error => {
                    status.innerHTML = "Oops! There was a problem submitting your form"
                });

                setSubmitting(false);
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
            <form onSubmit={handleSubmit} id="contactForm" action={appData.settings.formspreeURL} className="row align-items-center">
                <div className="col-lg-6 mil-up">
                    <input 
                      type="text" 
                      placeholder="What's your name"
                      name="name" 
                      required="required" 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name} 
                    />
                </div>
                <div className="col-lg-6 mil-up">
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      name="email"
                      required="required"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email} 
                    />
                </div>
                <div className="col-lg-12 mil-up">
                    <textarea 
                      placeholder="Tell us about our project"
                      name="message" 
                      required="required"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message} 
                    />
                </div>
                <div className="col-lg-8">
                    <p className="mil-up mil-mb-30"><span className="mil-accent">*</span> We promise not to disclose your personal information to third parties.</p>
                </div>
                <div className="col-lg-4">
                    <div className="mil-adaptive-right mil-up mil-mb-30">
                        <button type="submit" className="mil-btn mil-sm-btn">
                            <span>Send message</span>
                        </button>
                    </div>
                </div>
                <div className="form-status" id="contactFormStatus" />
            </form>
            )}
            </Formik>
        </div>
        {/* contact end */}
    
    </Layouts>
  );
};
export default Contact;
