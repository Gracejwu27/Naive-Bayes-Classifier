import React from 'react';
import {useDropzone} from 'react-dropzone';
import styles from "./UploadFile.module.css";
import {Oxygen} from "next/font/google"
import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import {DocumentArrowUpIcon} from '@heroicons/react/20/solid';

const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});



export default function UploadFile(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept:{
        'text/csv': [],
    },
    onDrop: (acceptedFiles) => {
        uploadFile(acceptedFiles[0]);
      },
  });

  const uploadFile = async (file) => {
    const formData = new FormData(); 
    formData.append('file', file);
    console.log(formData.file);
    try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('File uploaded successfully');
          const data = await response.json(); 
          console.log(data)
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

  const files = acceptedFiles.map(file => (
    <li className = {styles.file} key={file.path}>
      {file.path} 
    </li>
  ));

  return (
    <section className={styles.textInput}>
        <p className={styles.info}>
            Make sure your file is in the right form.
            <br/>
            The columns should be: 
            <br/> 
            <b> Text, Label</b>
        </p>

      <div 
      {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
          {acceptedFiles.length > 0 ? (

           <div className={styles.dropped}>
            <DocumentArrowUpIcon className={styles.icon2}/> 
            <p className={styles.file}>
              {acceptedFiles[0].path}
            </p>

            </div>
            
          ) : (
            <div className = {styles.drop}>
            <ArrowUpTrayIcon className={styles.icon} />
            <p>
                <b>Drag</b> and <b>Drop</b> a File or Click to Select File
                <br />
                Only <b>CSV</b> files allowed
            </p>

            </div>
          )}
          
        </div>
        
    </section>
    
  );
}

