export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {year} All rights reserved.</div>
      </div>

      <style>{`
        .footer {
          padding: 20px 10%;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: #0f0f14;
          color: #aaa;
          margin-top: 40px;
        }

        .footer-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 14px;
        }
      `}</style>
    </footer>
  );
}