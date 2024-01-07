/* eslint-disable */
import React from 'react';
import './styles.css';
import { studentDetails } from '../../../constants/constants';
import coursera from '../../../assets/coursera.png';
import indeed from '../../../assets/indeed.png';
import education from '../../../assets/education.png';
import udemy from '../../../assets/udemy.png';
import fedEx from '../../../assets/fedEx.png';
import elecom from '../../../assets/elecom.png';

interface StudentCardProps {
  img: string;
  name: string;
  position: string;
}

const TrustedByCard: React.FC = () => {
  return (
    <div className='trustedByCardMain'>
      <h2>Trusted by over 800+ companies</h2>
      <div className='trustedByCardDiv'>
        <img src={coursera} alt='img' />
        <img src={udemy} alt='img' />
        <img src={fedEx} alt='img' />
        <img src={education} alt='img' />
        <img src={elecom} alt='img' />
        <img src={indeed} alt='img' />
      </div>
    </div>
  );
};

const StudentCard: React.FC<StudentCardProps> = ({ img, name, position }) => {
  return (
    <div className='meetStudentsCardDiv'>
      <img src={img} alt='img' />
      <h3>{name}</h3>
      <p>{position}</p>
    </div>
  );
};

const MeetStudents: React.FC = () => {
  return (
    <>
      <div className='meetStudentsMain'>
        <h2>Meet Our Successful Students</h2>
        <p className='meetStudentsSubText'>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className='meetStudentsCardMainDiv'>
          {studentDetails.map((data) => (
            <StudentCard
              key={data.id}
              img={data.img}
              name={data.name}
              position={data.position}
            />
          ))}
        </div>
      </div>

      <TrustedByCard />
    </>
  );
};

export default MeetStudents;