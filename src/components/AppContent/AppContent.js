import React, { useState, useContext, useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectsJobsList from '../ProjectsJobsList/ProjectsJobsList'
import ProjectJobDetail from '../ProjectJobDetail/ProjectJobDetail'
const AppContent = () => {
    return (
        <>
            <Suspense >
                <Routes>
                    <Route path="/projectList" element={<ProjectsJobsList project_type={0} />}></Route>
                    <Route path="/joblist" element={<ProjectsJobsList project_type={1} />}></Route>
                    <Route path="/projectjobdetail/:id" element={<ProjectJobDetail />}></Route>
                </Routes>
            </Suspense >
        </>
    )
}

export default React.memo(AppContent)
