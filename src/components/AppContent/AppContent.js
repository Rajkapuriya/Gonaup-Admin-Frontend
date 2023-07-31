import React, { useState, useContext, useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectsList from '../ProjectsList/ProjectsList'
const AppContent = () => {
    return (
        <>
            <Suspense >
                <Routes>
                    <Route path="/projectList" element={<ProjectsList />}>   </Route>
                </Routes>
            </Suspense >
        </>
    )
}

export default React.memo(AppContent)
