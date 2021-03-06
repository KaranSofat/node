<?php

namespace WebService\ServiceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use WebService\ServiceBundle\Entity\User;

class ServiceController extends Controller
{
    public function getUsersAction()
    {
    
         $em = $this->getDoctrine()
	      ->getEntityManager();
        $user = $em->createQueryBuilder()
			  ->select('user')
			  ->from('WebServiceServiceBundle:User',  'user')
			  ->getQuery()
			  ->getResult();
        $response = new Response(json_encode(array('users' =>$user)));
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
       
       
    }
     public function addUserAction()
     {
         $em = $this->getDoctrine()
	      ->getEntityManager();
        $userInfo = $this->getRequest()->getContent();
         $obj = json_decode($userInfo);
         $fname = $obj->name;
         $lname = $obj->lastname;
         $company = $obj->company;
         $email = $obj->email;
         $designation = $obj->designation;
         
          $addUser = new User();
			    $addUser->setFirstName($fname);
			    $addUser->setLastName($lname);
			    $addUser->setEmail($email);
			    $addUser->setCompany($company);
			     $addUser->setDesignation($designation);
			    $em->persist($addUser);
			    $em->flush();
        
         
        $response = new Response(json_encode(array('users' =>$userInfo)));
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
       
       
    }
    public function editUserAction()
    {
    
       $em = $this->getDoctrine()
	      ->getEntityManager();
        $id = $_REQUEST['id'];
       $editUser = $em->getRepository('WebServiceServiceBundle:User')->find($id);
     
        $response = new Response(json_encode(array('users' =>$editUser)));
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
     
     }
       public function updateInfoAction()
      {
         $userInfo = $this->getRequest()->getContent();
         $obj = json_decode($userInfo);
         $id =  $obj->id; 
         $em = $this->getDoctrine()
	      ->getEntityManager();
         $editUser = $em->getRepository('WebServiceServiceBundle:User')->find($id);
         $fname = $obj->name;
         $lname = $obj->lastname;
         $company = $obj->company;
         $email = $obj->email;
         $designation = $obj->designation;
         
       
			  $editUser->setFirstName($fname);
			  $editUser->setLastName($lname);
			  $editUser->setEmail($email);
			  $editUser->setCompany($company);
			  $editUser->setDesignation($designation);
			  $em->persist($editUser);
			  $em->flush();
        $response = new Response(json_encode(array('data' =>'update Succesfully')));
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
     
     }
      public function deleteUserAction()
      {
         $em = $this->getDoctrine()
	      ->getEntityManager();
         $id = $_REQUEST['id'];
         $delete = $em->getRepository('WebServiceServiceBundle:User')->find($id);
         $em->remove($delete);
		     $em->flush();
        $response = new Response(json_encode(array('data' =>'delete Succesfully')));
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        return $response;
     
     }
     
    
}
