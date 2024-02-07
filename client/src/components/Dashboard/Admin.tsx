import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, updateUserRole } from "../../actions/Auth";
import styled from 'styled-components'
import ArticleManagement from "./ArticleManagement";

interface RootState {
  users: {
    users: Record<string, UserState>;
  };
}

interface UserState {
  

    _id: string;
    name: string;
    email?: string;
    role: string;
  
}



const Table = styled.table`
  width: 80%;
  border-collapse: separate; 
  border: 1px solid #ddd;
  border-spacing: 0;
  margin-top: 20px;
  margin-inline: auto;


 
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: center;
 
  
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
 
  text-align: center;

  &:nth-child(even) {
    background-color: #f9f9f9; /* Alternate row color */
  }
`;

const EditableDiv = styled.div`
  &:hover {
    cursor: pointer;
    border-bottom: 1px dashed blue;
  }
`;

const Button = styled.button`

  text-align: center;
`;

const Admin: React.FC = () => {
  const { users } = useSelector((state: RootState) => state?.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("profile")!);


  useEffect(() => {
    dispatch<any>(getUsers());
  }, [dispatch]);

  const usersNew = Object.values(users);
  const [editableUserId, setEditableUserId] = useState<string | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleRoleEdit = (userId: string, newRole: string) => {
    console.log("role:", newRole);
    dispatch<any>(updateUserRole(userId, { role: newRole }, navigate));

    setEditableUserId(null);
  };

  const handleEditButtonClick = (userId: string) => {
    setEditableUserId(userId);
  
    if (editableRef.current) {
      editableRef.current.focus();
    }
  };


  const handleAlert = () => {
    alert("Only admins can edit role!")
  }



  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    userId: string
  ) => {
    if (e.key === "Backspace" && e.currentTarget.innerText === "") {
      // Handle backspace when the content is empty
      handleRoleEdit(userId, "");
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditableUserId(null);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);


  return (
  <>
    <div >
        <Table style={{marginTop: "80px"}}>
        <thead>
          <tr style={{
             borderTopRightRadius: "20px",
             borderTopLeftRadius: "20px",
          }}>
            <Th>User ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {usersNew.map((user) => (
            <tr key={user._id}>
              <Td>{user._id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                {editableUserId === user._id ? (
                  <div
                    contentEditable
                    ref={editableRef}
                    suppressContentEditableWarning={true}
                    onKeyDown={(e) => handleKeyDown(e, user._id)}
                >
                    {user.role}
                  </div>
                ) : (
                  <span
                    onClick={() => handleEditButtonClick(user._id)}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px dashed blue",
                    }}
                  >
                    {user.role}
                  </span>
                )}
              </Td>
             
              <Td>
                {editableUserId === user._id ? (
                  <Button
                    onClick={() =>
                      handleRoleEdit(
                        user._id,
                        editableRef.current?.innerText || ""
                      )
                    }
                  >
                    Save
                  </Button>
                ) : (
                  <Button onClick={ () => userRole?.result?.role === "administrator" ? handleEditButtonClick(user._id) : handleAlert()}>
                    Edit
                  </Button>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    <ArticleManagement />
    </>
  );
};

export default Admin;