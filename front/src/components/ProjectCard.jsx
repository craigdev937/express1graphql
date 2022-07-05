import React from "react";

export const ProjectCard = ({ project }) => {
    return (
        <main className="col-md-6">
            <section className="card mb-3">
                <aside className="card-body">
                    <div className="d-flex 
                        justify-content-between 
                        align-items-center">
                        <h5 className="card-title"
                            >{project.name}
                        </h5>
                        <a 
                            className="btn btn-light" 
                            href={`/projects/${project.jd}`}
                            >View
                        </a>
                    </div>
                    <p className="small"
                        >Status: <strong>{project.status}</strong>
                    </p>
                </aside>
            </section>
        </main>
    );
};


