import React, {useState} from 'react'

// If you have a Formspree form ID, put it here as a string, e.g. 'yourFormID'.
// If left as null, the form will use a mailto fallback to send to info@healinchandigarh.com
const FORMSPREE_ID = null; // replace with 'xyzabc' when you create a Formspree form

export default function App(){
  const [form, setForm] = useState({name:'', email:'', phone:'', country:'', message:''});
  const [status, setStatus] = useState(null);

  function change(e){ setForm({...form, [e.target.name]: e.target.value}) }

  async function submit(e){
    e.preventDefault();
    setStatus('sending');
    try{
      if(FORMSPREE_ID){
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, country: form.country, message: form.message })
        });
        if(res.ok){ setStatus('sent') } else { setStatus('error') }
      } else {
        // mailto fallback
        const subject = encodeURIComponent('Heal in Chandigarh — Enquiry from ' + (form.name||'Unknown'));
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry: ${form.country}\n\nMessage:\n${form.message}`);
        window.location.href = `mailto:info@healinchandigarh.com?subject=${subject}&body=${body}`;
        setStatus('sent');
      }
    }catch(err){
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-[var(--teal)] text-white p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Heal in Chandigarh</h1>
            <div className="text-sm">Call/WhatsApp: +91 98887 05894</div>
          </div>
          <div className="text-xs mt-1">Your Gateway to World-Class Healthcare in North India</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-bold">World-class care, seamless patient support</h2>
            <p className="mt-3 text-gray-600">Advanced hospitals, international patient services and personalised care coordination in Chandigarh.</p>
            <div className="mt-4 flex gap-3">
              <a href="#contact" className="px-4 py-2 bg-[var(--teal)] text-white rounded">Request Estimate</a>
              <a href="#centres" className="px-4 py-2 border rounded">Our Centres</a>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div>Top hospitals: Apollo • Fortis • PGIMER</div>
              <div>Top treatments: Cardio • Ortho • Onco</div>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1580281657525-9f5e45a4a3b1?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" alt="Chandigarh" className="w-full h-64 object-cover" />
          </div>
        </section>

        <section id="centres" className="mt-10 bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-semibold">Centres of Excellence</h3>
          <p className="text-gray-600 mt-2">Trusted hospitals delivering international standards of care.</p>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <Card title="Apollo Hospitals" desc="Cardiology • Oncology • Transplants" />
            <Card title="Fortis" desc="Neurosciences • Orthopaedics" />
            <Card title="PGIMER" desc="Multi-speciality & Research" />
          </div>
        </section>

        <section id="services" className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-semibold">Patient Services</h4>
            <ul className="mt-3 text-gray-600 list-disc list-inside">
              <li>Visa & documentation support</li>
              <li>Airport pick-up & transfers</li>
              <li>Interpreter & accommodation assistance</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded shadow" id="contact">
            <h4 className="font-semibold">Contact & Estimate</h4>
            <p className="text-sm text-gray-600 mt-1">Fill the form — our team will respond within 48 hours.</p>

            <form onSubmit={submit} className="mt-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input name="name" value={form.name} onChange={change} required placeholder="Full name" className="p-3 border rounded" />
                <input name="email" type="email" value={form.email} onChange={change} required placeholder="Email address" className="p-3 border rounded" />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input name="phone" value={form.phone} onChange={change} placeholder="Phone / WhatsApp" className="p-3 border rounded" />
                <input name="country" value={form.country} onChange={change} placeholder="Country" className="p-3 border rounded" />
              </div>
              <textarea name="message" value={form.message} onChange={change} placeholder="Brief medical history / message" className="p-3 border rounded min-h-[120px]" />
              <div className="flex items-center gap-3">
                <button type="submit" className="px-4 py-2 bg-[var(--teal)] text-white rounded" disabled={status==='sending'}>{status==='sending'?'Sending...':'Send Message'}</button>
                <a className="text-sm text-gray-600" href="mailto:info@healinchandigarh.com">Or email: info@healinchandigarh.com</a>
              </div>
              {status==='sent' && <div className="text-sm text-green-600">Thank you — we will contact you shortly.</div>}
              {status==='error' && <div className="text-sm text-red-600">Submission failed. Please try emailing info@healinchandigarh.com</div>}
            </form>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} Heal in Chandigarh</footer>
      </main>
    </div>
  )
}

function Card({title, desc}){
  return (
    <div className="p-4 border rounded bg-gray-50">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{desc}</div>
    </div>
  )
}
