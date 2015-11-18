<?php
namespace WebService\ServiceBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM\Entity
 * @ORM\Table(name="angular_user")
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;
    /**
     * @ORM\Column(type="string")
     */
    public $first_name;

    /**
     * @ORM\Column(type="string")
     */
    public $last_name;
    /**
     * @ORM\Column(type="string")
     */
    public $email;

    /**
     * @ORM\Column(type="string")
     */
    public $company;
 
    /**
     * @ORM\Column(type="string")
     */
    public $designation;
 
      /**
     * @ORM\Column(type="integer")
     */
    public $status;

         /**
     * @ORM\Column(type="datetime")
     */
    public $creation_datetime;



  


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set first_name
     *
     * @param string $firstName
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->first_name = $firstName;
    
        return $this;
    }

    /**
     * Get first_name
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * Set last_name
     *
     * @param string $lastName
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->last_name = $lastName;
    
        return $this;
    }

    /**
     * Get last_name
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;
    
        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set company
     *
     * @param string $company
     * @return User
     */
    public function setCompany($company)
    {
        $this->company = $company;
    
        return $this;
    }

    /**
     * Get company
     *
     * @return string 
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * Set designation
     *
     * @param string $designation
     * @return User
     */
    public function setDesignation($designation)
    {
        $this->designation = $designation;
    
        return $this;
    }

    /**
     * Get designation
     *
     * @return string 
     */
    public function getDesignation()
    {
        return $this->designation;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return User
     */
    public function setStatus($status)
    {
        $this->status = $status;
    
        return $this;
    }

    /**
     * Get status
     *
     * @return integer 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set creation_datetime
     *
     * @param \DateTime $creationDatetime
     * @return User
     */
    public function setCreationDatetime($creationDatetime)
    {
        $this->creation_datetime = $creationDatetime;
    
        return $this;
    }

    /**
     * Get creation_datetime
     *
     * @return \DateTime 
     */
    public function getCreationDatetime()
    {
        return $this->creation_datetime;
    }
    public function __construct()
    {
        $this->setCreationDatetime(new \DateTime());
       
    }
}
