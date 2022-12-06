const ForwardedProblem = (props) => {

    const contacts = props.contacts;
    const problemIndex = props.problemIndex;

    return (

        <div>
      

            {contacts?.map((contact, index) => (
                   <div key={index}>

                         {index == problemIndex && 

                         <div>
                
                            <div className="solveHeader">
                                <h3>{contact.subject}</h3>
                                <h3>{contact.year}</h3>
                                <h2>{contact.title}</h2>
                                <h3>{contact.degree}</h3>
                                <h3>{contact.tutor}</h3>
                            </div>
                        
                            <h2>Problem</h2>

                            <div className="solveProblemBody">
                                <div className="col col-4" data-label="b">{contact.content}</div> 
                            </div>
                       
                        </div>
                        }
                   
                   </div>
                ))}
        </div>
    )
}

export default ForwardedProblem;