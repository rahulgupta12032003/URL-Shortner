import React, { useState } from "react";
import styles from "../styles/hash_url.module.css";
import { FaCopy } from "react-icons/fa";

import axios from "axios";
const HashUrl = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [hashedUrl, setHashedUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    if (hashedUrl) {
      navigator.clipboard.writeText(
        window.location.origin === "http://localhost:3000"
          ? `${process.env.REACT_APP_LOCAL_HOST_PORT}/api/urls/${hashedUrl}`
          : `${process.env.REACT_APP_SERVER_URL}/api/urls/${hashedUrl}`
      );
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        window.location.origin === "http://localhost:3000"
          ? `${process.env.REACT_APP_LOCAL_HOST_PORT}/api/urls/hash`
          : `${process.env.REACT_APP_SERVER_URL}/api/urls/hash`,
        {
          originalUrl,
        }
      );
      setHashedUrl(response.data.hashedUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.maincontainer}>
      <div>
        <h1>URL Hashing System</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className={styles.url_input}
              placeholder="Enter URL"
            />
            <button
              type="submit"
              disabled={originalUrl?.length === 0 ? true : false}
              className={
                originalUrl?.length === 0
                  ? styles.Hash_Url_Button_Disable
                  : styles.Hash_Url_Button
              }
            >
              Hash URL
            </button>
          </form>
          {hashedUrl && (
            <div className={styles.container}>
              <div className={styles.text}>
                <a
                  href={
                    window.location.origin === "http://localhost:3000"
                      ? `${process.env.REACT_APP_LOCAL_HOST_PORT}/api/urls/${hashedUrl}`
                      : `${process.env.REACT_APP_SERVER_URL}/api/urls/${hashedUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {window.location.origin === "http://localhost:3000"
                    ? `${process.env.REACT_APP_LOCAL_HOST_PORT}/api/urls/${hashedUrl}`
                    : `${process.env.REACT_APP_SERVER_URL}/api/urls/${hashedUrl}`}
                </a>
              </div>
              <button className={styles.copyButton} onClick={copyToClipboard}>
                {copySuccess ? (
                  "Copied!"
                ) : (
                  <FaCopy className={styles.copy_icon} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashUrl;
