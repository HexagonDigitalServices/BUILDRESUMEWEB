import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Edit, Camera, Trash2 } from 'lucide-react';
import { inputStyles, photoSelectorStyles, titleInputStyles } from '../assets/dummystyle';

export const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);
  const [hovered, setHovered] = useState(false);
  const styles = photoSelectorStyles;

  useEffect(() => {
    if (preview) setPreviewUrl(preview);
  }, [preview]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreview?.(url);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    setPreview?.(null);
  };

  const chooseFile = () => inputRef.current.click();

  return (
    <div className={styles.container}>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className={styles.hiddenInput} />
      {!previewUrl ? (
        <div
          className={styles.placeholder(hovered)}
          onClick={chooseFile}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button type="button" className={styles.cameraButton}>
            <Camera size={20} />
          </button>
        </div>
      ) : (
        <div
          className={styles.previewWrapper}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className={styles.previewImageContainer(hovered)} onClick={chooseFile}>
            <img src={previewUrl} alt="profile" className={styles.previewImage} />
          </div>
          <div className={styles.overlay}>
            <button type="button" className={styles.actionButton('white/80','white','gray-800')} onClick={chooseFile}>
              <Edit size={16} />
            </button>
            <button type="button" className={styles.actionButton('red-500','red-600','white')} onClick={handleRemove}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TitleInput = ({ title, setTitle }) => {
  const [editing, setEditing] = useState(false);
  const [focused, setFocused] = useState(false);
  const styles = titleInputStyles;

  return (
    <div className={styles.container}>
      {editing ? (
        <>
          <input
            type="text"
            placeholder="Resume title"
            className={styles.inputField(focused)}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
          <button className={styles.confirmButton} onClick={() => setEditing(false)}>
            <Check className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <h2 className={styles.titleText}>{title}</h2>
          <button className={styles.editButton} onClick={() => setEditing(true)}>
            <Edit className={styles.editIcon} />
          </button>
        </>
      )}
    </div>
  );
};
