import React, { useState, useContext, useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectsJobsList from '../ProjectsJobsList/ProjectsJobsList'
import ProjectJobDetail from '../ProjectJobDetail/ProjectJobDetail'
import ClientRecruiterList from '../ClientRecruiterList/ClientRecruiterList'
import ClientRecruiterDetail from '../ClientRecruiterDetail/ClientRecruiterDetail'
import DeveloperList from '../DeveloperList/DeveloperList'
import DeveloperDetail from '../DeveloperDetail/DeveloperDetail'
import AdminSetting from '../AdminSetting/AdminSetting'
import SkillServiceList from '../SkillServiceList/SkillServiceList'
const AppContent = () => {
    return (
        <>
            <Suspense >
                <Routes>
                    <Route path="/project-list" element={<ProjectsJobsList project_type={0} />}></Route>
                    <Route path="/job-list" element={<ProjectsJobsList project_type={1} />}></Route>
                    <Route path="/project-job-detail/:id" element={<ProjectJobDetail />}></Route>
                    <Route path="/client-list" element={<ClientRecruiterList user_type={1} />}></Route>
                    <Route path="/recruiter-list" element={<ClientRecruiterList user_type={2} />}></Route>
                    <Route path="/client-profile/:id" element={<ClientRecruiterDetail project_type={0} />}></Route>
                    <Route path="/recruiter-profile/:id" element={<ClientRecruiterDetail project_type={1} />}></Route>
                    <Route path="/developer-list" element={<DeveloperList />}></Route>
                    <Route path="/developer-profile/:id" element={<DeveloperDetail />}></Route>
                    <Route path="/admin-setting" element={<AdminSetting />}></Route>
                    <Route path="/skill-list" element={<SkillServiceList />}></Route>
                    <Route path="/service-list" element={<SkillServiceList />}></Route>
                </Routes>
            </Suspense >
        </>
    )
}

export default React.memo(AppContent)
