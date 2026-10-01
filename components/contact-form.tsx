export function ContactForm() {
  return (
    <form
      className="contact-form"
      action="https://formsubmit.co/kushagrapandey102@gmail.com"
      method="POST"
    >
      <input type="hidden" name="_subject" value="Portfolio contact - Kushagra Pandey" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="true" />

      <div className="form-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form-row">
        <label className="form-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" maxLength={80} required />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={120} required />
        </label>
      </div>

      <label className="form-field">
        <span>Short message</span>
        <textarea
          name="message"
          rows={6}
          maxLength={700}
          placeholder="Role, project, collaboration or a quick hello..."
          required
        />
      </label>

      <div className="form-submit-row">
        <button className="button button-primary" type="submit">Send message</button>
        <p>Your message goes to <strong>kushagrapandey102@gmail.com</strong>.</p>
      </div>
    </form>
  );
}
