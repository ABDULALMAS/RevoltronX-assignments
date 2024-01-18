import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, updateUserRole } from "../../actions/Auth";
import styled, { css, createGlobalStyle } from 'styled-components';

import { deletePost, getArticles } from "../../actions/Articles";
import { getArticlesTableData, updateArticleStatus } from "../../actions/Dashboard";

interface RootState {
  articles: {
    articles: Record<string, ArticleState>;
    isLoading: boolean;
  };
}

interface ArticleState {
  _id: string; 
  category: string ;
  selectedFile: string;
     name: string;
     createdAt: string;
     title: string;
     message: string;
     tags: string[];
     likes: string[];
     creator: string;
     comments: string[];
     status: string;

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



const PaginationContainer = styled.div`
  display: flex;
 justify-content: center;
 margin-top: 20px;
  list-style: none;
  padding: 0;
`;





interface ButtonProps {
  active?: boolean;
}

const baseButtonStyles = css`
background-color:#45a049;
  color: white;
  border: 1px solid #45a049;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #dddddd;
    color: #666666;
    border: 1px solid #dddddd;
    cursor: not-allowed;
  }
`;

const PaginationButton = styled.button<ButtonProps>`
  ${baseButtonStyles}
`;

const ArticleManagement: React.FC = () => {
  const { articles, isLoading } = useSelector((state: RootState) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
  dispatch<any>(getArticlesTableData());
  },[dispatch])

  const articlesArray = Object.values(articles).reverse();
  
  const articlesPerPage = 9;
  const totalPages = Math.ceil(articlesArray.length/articlesPerPage);
 const [currentPage, setCurrentPage] = useState<number>(1);

 const startIndex = (currentPage -1) * articlesPerPage;
 const visibleArticles = articlesArray.slice(startIndex, startIndex + articlesPerPage);


 const handlePageChange = (newPage: number) => {
  setCurrentPage(newPage);
 }


 

  const [editableUserId, setEditableUserId] = useState<string | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleRoleEdit = (articleId: string, newStatus: string) => {
  
    console.log("role:", newStatus);
    console.log("article Id:", articleId)
    dispatch<any>(updateArticleStatus(articleId, { status: newStatus }, navigate));
    // navigate("/admin/dashboard");

    setEditableUserId(null);
  };

  const handleEditButtonClick = (userId: string) => {
    setEditableUserId(userId);
  
    if (editableRef.current) {
      editableRef.current.focus();
    }
  };



  const handleRead = (id: string) => {
    navigate(`/articles/${id}`);
  }

  const handleDelete = (id: string) => {
    dispatch<any>(deletePost(id))
  }


  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    userId: string
  ) => {
    if (e.key === "Backspace" && e.currentTarget.innerText === "") {
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
    <div>
    <Table style={{marginTop: "80px"}}>
    <thead>
      <tr style={{
         borderTopRightRadius: "20px",
         borderTopLeftRadius: "20px",
      }}>
        
        <Th>Serial No.</Th>
        <Th>Created At</Th>
        <Th>Article ID</Th>
        <Th>Creator</Th>
        <Th>Title</Th>
        <Th>Category</Th>
        <Th>Status</Th>
        <Th>Actions</Th>
      </tr>
    </thead>
    <tbody>
      {visibleArticles.map((article, index) => (
        <tr key={article._id}>

          <Td>{startIndex + index + 1}</Td>
          <Td>{article.createdAt}</Td>
          <Td>{article._id}</Td>
          <Td>{article.name}</Td>
          <Td style={{ width: "20%",flexWrap: "wrap"}}>{article.title}</Td>
          <Td>{article.category}</Td>

          <Td>
            {editableUserId === article._id ? (
              <div
                contentEditable
                ref={editableRef}
                suppressContentEditableWarning={true}
                onKeyDown={(e) => handleKeyDown(e, article._id)}
            >
                {article.status}
              </div>
            ) : (
              <span
                onClick={() => handleEditButtonClick(article._id)}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px dashed blue",
                }}
              >
                {article.status}
              </span>
            )}
          </Td>
         
          <Td>
            {editableUserId === article._id ? (
              <Button
                onClick={() =>
                  handleRoleEdit(
                    article._id,
                    editableRef.current?.innerText || ""
                  )
                }
              >
                Save
              </Button>
            ) : (
              <Button onClick={() => handleEditButtonClick(article._id)}>
                Edit
              </Button>
            )}

            <Button onClick={() =>handleRead(article._id)}>Read </Button>
            <Button onClick={() => handleDelete(article._id)}>Delete </Button>
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>

  <PaginationContainer>
    <PaginationButton 
    
    onClick={() => handlePageChange(currentPage -1)}
    disabled={currentPage === 1}
    >
   Previous
    </PaginationButton>
    {Array.from({ length: totalPages},(_, index) => (
      <PaginationButton    key={index + 1} onClick={() => handlePageChange(index + 1)}>
     { index + 1}
      </PaginationButton>
    ))

    }
    <PaginationButton    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    >
      Next
    </PaginationButton>
  </PaginationContainer>

  </div>
  )
}

export default ArticleManagement